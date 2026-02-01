import { Mark, Student, Subject } from '../models/index.js';
import unebGrading from '../utils/unebGrading.js';

/**
 * Submit marks with UNEB grading support
 * Handles both old and new grading systems
 */
export const submitMarks = async (req, res) => {
    try {
        const {
            student_id,
            subject_id,
            term,
            year,
            grading_system, // 'old_system' or 'new_system'

            // New System Fields
            continuous_assessment,
            project_work,
            end_of_cycle_exam,

            // Old System Fields
            score
        } = req.body;

        // Validate required fields
        if (!student_id || !subject_id || !term) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Prepare mark data
        const markData = {
            student_id,
            subject_id,
            term,
            year: year || new Date().getFullYear(),
            grading_system: grading_system || 'new_system'
        };

        // Process based on grading system
        if (markData.grading_system === 'new_system') {
            // New UNEB System (Competency-Based)
            if (continuous_assessment === undefined || end_of_cycle_exam === undefined) {
                return res.status(400).json({
                    message: 'New system requires continuous_assessment and end_of_cycle_exam'
                });
            }

            markData.continuous_assessment = continuous_assessment;
            markData.project_work = project_work || 0;
            markData.end_of_cycle_exam = end_of_cycle_exam;

            // Calculate final score (CA * 0.2 + EOT * 0.8)
            markData.final_score = unebGrading.calculateNewSystemScore(
                continuous_assessment,
                end_of_cycle_exam
            );

            // Determine letter grade
            markData.letter_grade = unebGrading.getLetterGrade(markData.final_score);

            // Note: result_classification is determined after all subjects
        } else {
            // Old UNEB System (Content-Based)
            if (score === undefined) {
                return res.status(400).json({
                    message: 'Old system requires score'
                });
            }

            markData.score = score;
            markData.final_score = score;
            markData.numerical_grade = unebGrading.getNumericalGrade(score);
        }

        // Create or update mark
        const [mark, created] = await Mark.findOrCreate({
            where: { student_id, subject_id, term, year: markData.year },
            defaults: markData
        });

        if (!created) {
            await mark.update(markData);
        }

        // Fetch complete mark with associations
        const completeMark = await Mark.findByPk(mark.id, {
            include: [
                { model: Student, attributes: ['full_name', 'reg_number'] },
                { model: Subject, attributes: ['name', 'code'] }
            ]
        });

        res.json({
            message: created ? 'Mark submitted successfully' : 'Mark updated successfully',
            mark: completeMark
        });

    } catch (error) {
        console.error('Submit marks error:', error);
        res.status(500).json({ message: 'Error submitting marks', error: error.message });
    }
};

/**
 * Get marks for a student with UNEB grading
 */
export const getStudentMarks = async (req, res) => {
    try {
        const { student_id } = req.params;
        const { term, year, grading_system } = req.query;

        const where = { student_id };
        if (term) where.term = term;
        if (year) where.year = year;
        if (grading_system) where.grading_system = grading_system;

        const marks = await Mark.findAll({
            where,
            include: [{ model: Subject, attributes: ['name', 'code', 'category'] }],
            order: [['year', 'DESC'], ['term', 'DESC']]
        });

        // Calculate overall result classification for new system
        if (grading_system === 'new_system' && marks.length > 0) {
            const subjectGrades = marks.map(m => ({
                subject: m.Subject?.name,
                letterGrade: m.letter_grade
            }));

            const resultClassification = unebGrading.determineResultClassification(subjectGrades);

            res.json({
                marks,
                summary: {
                    total_subjects: marks.length,
                    result_classification: resultClassification,
                    average_score: (marks.reduce((sum, m) => sum + parseFloat(m.final_score || 0), 0) / marks.length).toFixed(2)
                }
            });
        } else {
            res.json({ marks });
        }

    } catch (error) {
        console.error('Get student marks error:', error);
        res.status(500).json({ message: 'Error fetching marks', error: error.message });
    }
};

/**
 * Calculate value-added score (PLE to UCE improvement)
 */
export const calculateValueAdded = async (req, res) => {
    try {
        const { student_id } = req.params;

        // Get student with PLE aggregate
        const student = await Student.findByPk(student_id);
        if (!student || !student.ple_aggregate) {
            return res.status(404).json({ message: 'Student not found or PLE data missing' });
        }

        // Get UCE marks (S4, Term 3)
        const uceMarks = await Mark.findAll({
            where: {
                student_id,
                term: 'Term 3',
                grading_system: 'new_system'
            },
            include: [{ model: Subject, attributes: ['name'] }],
            order: [['year', 'DESC']],
            limit: 10
        });

        if (uceMarks.length === 0) {
            return res.status(404).json({ message: 'No UCE marks found' });
        }

        // Calculate average UCE score
        const avgUCEScore = uceMarks.reduce((sum, m) => sum + parseFloat(m.final_score), 0) / uceMarks.length;

        // Value-added calculation
        // PLE aggregate: 4 (best) to 36 (worst)
        // Convert to expected UCE score
        const expectedUCEScore = 100 - ((student.ple_aggregate - 4) * 2.5); // Rough conversion
        const valueAdded = avgUCEScore - expectedUCEScore;

        let improvement;
        if (valueAdded >= 20) improvement = 'Exceptional';
        else if (valueAdded >= 10) improvement = 'Excellent';
        else if (valueAdded >= 5) improvement = 'Good';
        else if (valueAdded >= 0) improvement = 'Maintained';
        else improvement = 'Needs Support';

        res.json({
            student: {
                name: student.full_name,
                reg_number: student.reg_number
            },
            ple_aggregate: student.ple_aggregate,
            expected_uce_score: expectedUCEScore.toFixed(2),
            actual_uce_score: avgUCEScore.toFixed(2),
            value_added: valueAdded.toFixed(2),
            improvement_level: improvement,
            uce_marks: uceMarks
        });

    } catch (error) {
        console.error('Value-added calculation error:', error);
        res.status(500).json({ message: 'Error calculating value-added', error: error.message });
    }
};

/**
 * Batch submit marks for a class
 */
export const batchSubmitMarks = async (req, res) => {
    try {
        const { marks } = req.body; // Array of mark objects

        if (!Array.isArray(marks) || marks.length === 0) {
            return res.status(400).json({ message: 'Invalid marks array' });
        }

        const results = [];
        const errors = [];

        for (const markData of marks) {
            try {
                const processedMark = { ...markData };

                // Auto-calculate for new system
                if (processedMark.grading_system === 'new_system') {
                    processedMark.final_score = unebGrading.calculateNewSystemScore(
                        processedMark.continuous_assessment,
                        processedMark.end_of_cycle_exam
                    );
                    processedMark.letter_grade = unebGrading.getLetterGrade(processedMark.final_score);
                } else if (processedMark.grading_system === 'old_system') {
                    processedMark.final_score = processedMark.score;
                    processedMark.numerical_grade = unebGrading.getNumericalGrade(processedMark.score);
                }

                const [mark, created] = await Mark.findOrCreate({
                    where: {
                        student_id: processedMark.student_id,
                        subject_id: processedMark.subject_id,
                        term: processedMark.term,
                        year: processedMark.year || new Date().getFullYear()
                    },
                    defaults: processedMark
                });

                if (!created) {
                    await mark.update(processedMark);
                }

                results.push({ student_id: processedMark.student_id, status: 'success' });
            } catch (error) {
                errors.push({
                    student_id: markData.student_id,
                    error: error.message
                });
            }
        }

        res.json({
            message: 'Batch submission completed',
            successful: results.length,
            failed: errors.length,
            results,
            errors
        });

    } catch (error) {
        console.error('Batch submit error:', error);
        res.status(500).json({ message: 'Error in batch submission', error: error.message });
    }
};

export default {
    submitMarks,
    getStudentMarks,
    calculateValueAdded,
    batchSubmitMarks
};

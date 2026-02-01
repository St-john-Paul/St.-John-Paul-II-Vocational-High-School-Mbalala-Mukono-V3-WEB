import { Mark, Student, Subject, User } from '../models/index.js';
import { Sequelize } from 'sequelize';
import unebGrading from '../utils/unebGrading.js';

/**
 * Get School-Wide Value Added Analysis
 * Compares PLE Aggregates to UCE Performance
 */
export const getValueAddedStats = async (req, res) => {
    try {
        // Fetch All Students in School
        const totalEnrollment = await Student.count();

        // Fetch Students with PLE data for Value-Added (Evaluable)
        const students = await Student.findAll({
            where: {
                ple_aggregate: { [Sequelize.Op.ne]: null }
            },
            attributes: ['id', 'full_name', 'reg_number', 'ple_aggregate', 'class_level']
        });

        const stats = {
            total_enrollment: totalEnrollment,
            total_students: students.length, // Evaluable count
            improved: 0,
            maintained: 0,
            declined: 0,
            student_data: []
        };

        for (const student of students) {
            // Get UCE Marks (Avg of all subjects)
            const marks = await Mark.findAll({
                where: {
                    student_id: student.id,
                    grading_system: 'new_system'
                }
            });

            if (marks.length > 0) {
                const avgScore = marks.reduce((sum, m) => sum + parseFloat(m.final_score), 0) / marks.length;

                // Expected Score: 100 - ((PLE - 4) * 2.5)
                // PLE 4 (Best) -> Expected 100
                // PLE 36 (Worst) -> Expected 20
                const expectedScore = 100 - ((student.ple_aggregate - 4) * 2.5);
                const valueAdded = avgScore - expectedScore;

                let status = 'Maintained';
                if (valueAdded > 5) {
                    status = 'Improved';
                    stats.improved++;
                } else if (valueAdded < -5) {
                    status = 'Declined';
                    stats.declined++;
                } else {
                    stats.maintained++;
                }

                stats.student_data.push({
                    name: student.full_name,
                    ple: student.ple_aggregate,
                    uce_avg: avgScore.toFixed(1),
                    value_added: valueAdded.toFixed(1),
                    status
                });
            }
        }

        // Sort by highest value added
        stats.student_data.sort((a, b) => parseFloat(b.value_added) - parseFloat(a.value_added));

        res.json(stats);
    } catch (error) {
        console.error('Value Added Stats Error:', error);
        res.status(500).json({ message: 'Error fetching value added stats' });
    }
};

/**
 * Get Subject Performance Analysis
 */
export const getSubjectPerformance = async (req, res) => {
    try {
        const subjects = await Subject.findAll();
        const performance = [];

        for (const subject of subjects) {
            const marks = await Mark.findAll({
                where: { subject_id: subject.id, year: 2026 } // Current Year
            });

            if (marks.length > 0) {
                const avg = marks.reduce((sum, m) => sum + parseFloat(m.final_score || m.score || 0), 0) / marks.length;
                const distinctions = marks.filter(m => ['A', 'D1', 'D2'].includes(m.letter_grade || m.numerical_grade)).length;

                performance.push({
                    subject: subject.name,
                    code: subject.code,
                    avg_score: avg.toFixed(1),
                    students: marks.length,
                    distinction_rate: ((distinctions / marks.length) * 100).toFixed(1)
                });
            }
        }

        // Sort by performance
        performance.sort((a, b) => parseFloat(b.avg_score) - parseFloat(a.avg_score));

        res.json(performance);
    } catch (error) {
        console.error('Subject Performance Error:', error);
        res.status(500).json({ message: 'Error fetching subject performance' });
    }
};

/**
 * Get At-Risk Students (Early Warning System)
 * Students failing > 3 subjects
 */
export const getAtRiskStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        const atRisk = [];

        for (const student of students) {
            const failures = await Mark.count({
                where: {
                    student_id: student.id,
                    [Sequelize.Op.or]: [
                        { letter_grade: 'E' },
                        { numerical_grade: 'F9' }
                    ]
                }
            });

            if (failures >= 3) {
                atRisk.push({
                    id: student.id,
                    name: student.full_name,
                    class: student.class_level,
                    reg_number: student.reg_number,
                    failed_subjects: failures,
                    parent_phone: student.parent_phone
                });
            }
        }

        res.json(atRisk);
    } catch (error) {
        console.error('At Risk Error:', error);
        res.status(500).json({ message: 'Error identifying at-risk students' });
    }
};

export default {
    getValueAddedStats,
    getSubjectPerformance,
    getAtRiskStudents
};

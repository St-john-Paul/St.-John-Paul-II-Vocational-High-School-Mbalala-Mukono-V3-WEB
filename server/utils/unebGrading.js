/**
 * UNEB Grading System Utilities
 * Supports both Old (Content-Based) and New (Competency-Based) systems
 */

// ===== NEW SYSTEM (Competency-Based 2024+) =====

/**
 * Calculate final score for new UNEB system
 * Formula: (CA * 0.20) + (EOT * 0.80)
 * @param {number} continuousAssessment - CA score (0-100)
 * @param {number} endOfCycleExam - EOT exam score (0-100)
 * @returns {number} Final score (0-100)
 */
export function calculateNewSystemScore(continuousAssessment, endOfCycleExam) {
    const ca = parseFloat(continuousAssessment) || 0;
    const eot = parseFloat(endOfCycleExam) || 0;

    // CA weighted at 20%, EOT at 80%
    const finalScore = (ca * 0.20) + (eot * 0.80);
    return Math.round(finalScore * 100) / 100; // Round to 2 decimal places
}

/**
 * Determine letter grade based on final score
 * @param {number} finalScore - Calculated final score (0-100)
 * @returns {string} Letter grade (A, B, C, D, or E)
 */
export function getLetterGrade(finalScore) {
    if (finalScore >= 80) return 'A'; // Exceptional achievement
    if (finalScore >= 65) return 'B'; // Outstanding performance
    if (finalScore >= 50) return 'C'; // Satisfactory
    if (finalScore >= 35) return 'D'; // Basic
    return 'E'; // Elementary
}

/**
 * Get grade descriptor for letter grade
 * @param {string} letterGrade - Letter grade (A-E)
 * @returns {string} Competency descriptor
 */
export function getGradeDescriptor(letterGrade) {
    const descriptors = {
        'A': 'Exceptional achievement - Can apply knowledge creatively and solve complex problems',
        'B': 'Outstanding performance - Demonstrates strong competency and practical skills',
        'C': 'Satisfactory - Shows adequate understanding and can apply basic concepts',
        'D': 'Basic - Developing competency with support needed',
        'E': 'Elementary - Limited competency, requires significant support'
    };
    return descriptors[letterGrade] || 'No descriptor available';
}

/**
 * Determine result classification for UCE
 * @param {Array} subjectGrades - Array of {subject, letterGrade} objects
 * @returns {string} Result_1, Result_2, or Result_3
 */
export function determineResultClassification(subjectGrades) {
    if (!subjectGrades || subjectGrades.length === 0) {
        return 'Result_3'; // Did not sit for exams
    }

    // Count subjects with grade D or better
    const qualifyingSubjects = subjectGrades.filter(g =>
        ['A', 'B', 'C', 'D'].includes(g.letterGrade)
    ).length;

    // Result 1: At least grade D or better in one or more subjects
    if (qualifyingSubjects > 0) {
        return 'Result_1'; // Qualified for UCE certificate
    }

    return 'Result_2'; // Does not qualify for certificate
}

// ===== OLD SYSTEM (Content-Based Pre-2024) =====

/**
 * Get numerical grade for old system
 * @param {number} score - Raw score (0-100)
 * @returns {string} Numerical grade (D1-F9)
 */
export function getNumericalGrade(score) {
    if (score >= 85) return 'D1';
    if (score >= 80) return 'D2';
    if (score >= 75) return 'C3';
    if (score >= 70) return 'C4';
    if (score >= 65) return 'C5';
    if (score >= 60) return 'C6';
    if (score >= 50) return 'P7';
    if (score >= 40) return 'P8';
    return 'F9';
}

/**
 * Calculate division for old system
 * @param {Array} numericalGrades - Array of numerical grades
 * @returns {string} Division_1, Division_2, Division_3, Division_4, or U
 */
export function calculateDivision(numericalGrades) {
    if (!numericalGrades || numericalGrades.length === 0) {
        return 'U'; // Ungraded
    }

    // Count distinctions (D1, D2)
    const distinctions = numericalGrades.filter(g => ['D1', 'D2'].includes(g)).length;

    // Count credits (C3-C6)
    const credits = numericalGrades.filter(g => ['C3', 'C4', 'C5', 'C6'].includes(g)).length;

    // Count passes (P7, P8)
    const passes = numericalGrades.filter(g => ['P7', 'P8'].includes(g)).length;

    // Count failures (F9)
    const failures = numericalGrades.filter(g => g === 'F9').length;

    // Division 1: Minimum 5 subjects with at least 2 distinctions
    if (numericalGrades.length >= 5 && distinctions >= 2) {
        return 'Division_1';
    }

    // Division 2: Minimum 5 subjects with credits
    if (numericalGrades.length >= 5 && (distinctions + credits) >= 5) {
        return 'Division_2';
    }

    // Division 3: Minimum 5 subjects passed
    if (numericalGrades.length >= 5 && (distinctions + credits + passes) >= 5) {
        return 'Division_3';
    }

    // Division 4: Some passes
    if (passes > 0 || credits > 0 || distinctions > 0) {
        return 'Division_4';
    }

    return 'U'; // Ungraded
}

// ===== CONVERSION UTILITIES =====

/**
 * Convert old system grade to approximate new system equivalent
 * @param {string} numericalGrade - Old system grade (D1-F9)
 * @returns {string} Approximate letter grade
 */
export function convertOldToNew(numericalGrade) {
    const conversion = {
        'D1': 'A', 'D2': 'A',
        'C3': 'B', 'C4': 'B',
        'C5': 'C', 'C6': 'C',
        'P7': 'D', 'P8': 'D',
        'F9': 'E'
    };
    return conversion[numericalGrade] || 'E';
}

/**
 * Convert new system grade to approximate old system equivalent
 * @param {string} letterGrade - New system grade (A-E)
 * @returns {string} Approximate numerical grade
 */
export function convertNewToOld(letterGrade) {
    const conversion = {
        'A': 'D1',
        'B': 'C3',
        'C': 'C5',
        'D': 'P7',
        'E': 'F9'
    };
    return conversion[letterGrade] || 'F9';
}

export default {
    // New System
    calculateNewSystemScore,
    getLetterGrade,
    getGradeDescriptor,
    determineResultClassification,

    // Old System
    getNumericalGrade,
    calculateDivision,

    // Conversion
    convertOldToNew,
    convertNewToOld
};

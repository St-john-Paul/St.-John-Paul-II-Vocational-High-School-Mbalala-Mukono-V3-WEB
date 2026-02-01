import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Mark = sequelize.define('Mark', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    subject_id: { type: DataTypes.INTEGER, allowNull: false },

    // ===== UNEB GRADING SYSTEM FIELDS =====
    // Grading system type
    grading_system: {
        type: DataTypes.ENUM('old_system', 'new_system'),
        defaultValue: 'new_system',
        comment: 'old_system = Content-Based (D1-F9), new_system = Competency-Based (A-E)'
    },

    // NEW SYSTEM (Competency-Based 2024+)
    continuous_assessment: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: { min: 0, max: 100 },
        comment: 'CA score (weighted 20% in final grade)'
    },
    project_work: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: { min: 0, max: 100 },
        comment: 'Project work score (included in CA)'
    },
    end_of_cycle_exam: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: { min: 0, max: 100 },
        comment: 'EOT exam score (weighted 80% in final grade)'
    },
    letter_grade: {
        type: DataTypes.ENUM('A', 'B', 'C', 'D', 'E'),
        allowNull: true,
        comment: 'Final letter grade for new system'
    },
    result_classification: {
        type: DataTypes.ENUM('Result_1', 'Result_2', 'Result_3'),
        allowNull: true,
        comment: 'Result 1 = Qualified, Result 2 = Not Qualified, Result 3 = Did not sit'
    },

    // OLD SYSTEM (Content-Based Pre-2024) - Kept for backward compatibility
    score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Old system numeric score (0-100)'
    },
    numerical_grade: {
        type: DataTypes.ENUM('D1', 'D2', 'C3', 'C4', 'C5', 'C6', 'P7', 'P8', 'F9'),
        allowNull: true,
        comment: 'Old system numerical grade'
    },
    division: {
        type: DataTypes.ENUM('Division_1', 'Division_2', 'Division_3', 'Division_4', 'U'),
        allowNull: true,
        comment: 'Old system division classification'
    },

    // COMMON FIELDS
    term: { type: DataTypes.ENUM('Term 1', 'Term 2', 'Term 3'), allowNull: false },
    year: { type: DataTypes.INTEGER, defaultValue: new Date().getFullYear() },
    grading: {
        type: DataTypes.STRING,
        comment: 'Legacy field - kept for compatibility'
    },

    // Calculated final score (for both systems)
    final_score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        comment: 'Calculated final score based on system (CA*0.2 + EOT*0.8 for new, or direct score for old)'
    }
});

export default Mark;

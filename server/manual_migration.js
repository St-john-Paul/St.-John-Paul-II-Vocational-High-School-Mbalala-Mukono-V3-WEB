import { Sequelize } from 'sequelize';
import sequelize from './config/database.js';

const manualMigration = async () => {
    try {
        console.log('Starting manual migration for UNEB fields...');
        const queryInterface = sequelize.getQueryInterface();

        // 1. Add columns to Students table
        console.log('Adding columns to Students table...');
        try {
            await queryInterface.addColumn('Students', 'ple_aggregate', {
                type: Sequelize.INTEGER,
                allowNull: true
            });
            console.log('✓ Added ple_aggregate');
        } catch (e) {
            console.log('⚠ ple_aggregate might already exist:', e.message);
        }

        try {
            await queryInterface.addColumn('Students', 'curriculum_type', {
                type: Sequelize.STRING, // ENUMs are strings in SQLite
                defaultValue: 'competency_based'
            });
            console.log('✓ Added curriculum_type');
        } catch (e) {
            console.log('⚠ curriculum_type might already exist:', e.message);
        }

        // 2. Re-create Marks table with correct schema
        console.log('Re-creating Marks table...');

        // Drop existing Marks table
        try {
            await queryInterface.dropTable('Marks');
            console.log('✓ Dropped existing Marks table');
        } catch (e) {
            console.log('⚠ Could not drop Marks table:', e.message);
        }

        // Create new Marks table
        await queryInterface.createTable('Marks', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            student_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            subject_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            term: {
                type: Sequelize.STRING,
                allowNull: false
            },
            year: {
                type: Sequelize.INTEGER,
                defaultValue: new Date().getFullYear()
            },

            // New System Fields
            grading_system: {
                type: Sequelize.STRING,
                defaultValue: 'new_system'
            },
            continuous_assessment: { type: Sequelize.DECIMAL(5, 2) },
            project_work: { type: Sequelize.DECIMAL(5, 2) },
            end_of_cycle_exam: { type: Sequelize.DECIMAL(5, 2) },
            letter_grade: { type: Sequelize.STRING },
            result_classification: { type: Sequelize.STRING },

            // Old System Fields (Now Nullable)
            score: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            numerical_grade: { type: Sequelize.STRING },
            division: { type: Sequelize.STRING },

            // Common
            grading: { type: Sequelize.STRING },
            final_score: { type: Sequelize.DECIMAL(5, 2) },
            createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
            updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
        });
        console.log('✓ Created new Marks table with nullable score');

        console.log('✅ Manual migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
};

manualMigration();

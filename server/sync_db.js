import sequelize from './config/database.js';

const syncDatabase = async () => {
    try {
        console.log('Syncing database with altered tables...');
        await sequelize.authenticate();
        console.log('Connection successful');

        // Enable alter: true to add new columns to existing tables
        await sequelize.sync({ alter: true });

        console.log('✅ Database synced successfully!');
        console.log('\nNew fields added:');
        console.log('  Students: ple_aggregate, curriculum_type');
        console.log('  Marks: grading_system, continuous_assessment, project_work,');
        console.log('         end_of_cycle_exam, letter_grade, result_classification,');
        console.log('         numerical_grade, division, final_score');
        console.log('\nYou can now run: node server/seed_uneb_data.js');
        process.exit(0);
    } catch (error) {
        console.error('Sync error:', error);
        process.exit(1);
    }
};

syncDatabase();

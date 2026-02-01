import { sequelize, Subject } from './models/index.js';

const seedSubjects = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true }); // Ensure tables exist and update schema

        const subjects = [
            // O-Level Core
            { name: 'Mathematics', code: 'MTC', is_core: true, category: 'O-Level' },
            { name: 'English Language', code: 'ENG', is_core: true, category: 'O-Level' },
            { name: 'Biology', code: 'BIO', is_core: true, category: 'O-Level' },
            { name: 'Chemistry', code: 'CHM', is_core: true, category: 'O-Level' },
            { name: 'Physics', code: 'PHY', is_core: true, category: 'O-Level' },
            { name: 'History', code: 'HIS', is_core: true, category: 'O-Level' },
            { name: 'Geography', code: 'GEO', is_core: true, category: 'O-Level' },
            { name: 'Christian Religious Ed.', code: 'CRE', is_core: false, category: 'O-Level' },
            { name: 'Islam Religious Ed.', code: 'IRE', is_core: false, category: 'O-Level' },
            { name: 'Computer Studies', code: 'CST', is_core: false, category: 'O-Level' },
            { name: 'Agriculture', code: 'AGR', is_core: false, category: 'O-Level' },
            { name: 'Fine Art', code: 'ART', is_core: false, category: 'O-Level' },
            { name: 'Literature in English', code: 'LIT', is_core: false, category: 'O-Level' },
            { name: 'Commerce', code: 'COM', is_core: false, category: 'O-Level' },
            { name: 'Entrepreneurship', code: 'ENT', is_core: false, category: 'O-Level' },

            // A-Level
            { name: 'Mathematics (Sub)', code: 'SUBMATH', is_core: true, category: 'A-Level' },
            { name: 'General Paper', code: 'GP', is_core: true, category: 'A-Level' },
            { name: 'Pure Mathematics', code: 'PMT', is_core: false, category: 'A-Level' },
            { name: 'Physics (A)', code: 'PHY-A', is_core: false, category: 'A-Level' },
            { name: 'Chemistry (A)', code: 'CHM-A', is_core: false, category: 'A-Level' },
            { name: 'Biology (A)', code: 'BIO-A', is_core: false, category: 'A-Level' },
            { name: 'Economics', code: 'ECO', is_core: false, category: 'A-Level' },
            { name: 'History (A)', code: 'HIS-A', is_core: false, category: 'A-Level' },
            { name: 'Geography (A)', code: 'GEO-A', is_core: false, category: 'A-Level' },
            { name: 'Divinity', code: 'DIV', is_core: false, category: 'A-Level' },
            { name: 'Literature (A)', code: 'LIT-A', is_core: false, category: 'A-Level' },
            { name: 'ICT', code: 'ICT-A', is_core: true, category: 'A-Level' },

            // Vocational
            { name: 'Tailoring & Design', code: 'VOC-TL', is_core: false, category: 'Vocational' },
            { name: 'Building & Construction', code: 'VOC-BC', is_core: false, category: 'Vocational' },
            { name: 'Hairdressing & Beauty', code: 'VOC-HB', is_core: false, category: 'Vocational' },
            { name: 'Catering & Hotel Mgt', code: 'VOC-CH', is_core: false, category: 'Vocational' },
            { name: 'Automotive Mechanics', code: 'VOC-AM', is_core: false, category: 'Vocational' },
            { name: 'Electrical Installation', code: 'VOC-EI', is_core: false, category: 'Vocational' },
            { name: 'Carpentry & Joinery', code: 'VOC-CJ', is_core: false, category: 'Vocational' },
            { name: 'Agriculture (Prac)', code: 'VOC-AG', is_core: false, category: 'Vocational' }
        ];

        for (const sub of subjects) {
            // Check if exists
            const exists = await Subject.findOne({ where: { code: sub.code } });
            if (!exists) {
                await Subject.create(sub);
            } else {
                // Update category if it was missing
                exists.category = sub.category;
                await exists.save();
            }
        }

        console.log('Subjects seeded successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedSubjects();

import sequelize from '../server/config/database.js';
import { PageSection } from '../server/models/index.js';

const seed = async () => {
    try {
        await sequelize.sync();

        const sections = [
            {
                section_key: 'about_director',
                title: 'Word from the Director',
                subtitle: 'LEADERSHIP',
                content: 'Welcome to St. John Paul II Vocational & High School. Our commitment is to provide holistic education that empowers students with both academic excellence and practical vocational skills. We believe every student has a unique talent that, when nurtured, leads to a successful and productive life.',
                image_url: '/hero-main.png',
                display_order: 3
            },
            {
                section_key: 'about_deputy',
                title: 'Word from the Deputy HEAD Teacher',
                subtitle: 'ACADEMIC EXCELLENCE',
                content: 'At St. John Paul II, we maintain high standards of discipline and academic rigor. Our dedicated teaching staff works tirelessly to ensure that every student reaches their full potential. We are proud of our tradition of success in national examinations and the character of our graduates.',
                image_url: '/facilities.png',
                display_order: 4
            },
            {
                section_key: 'about_dos',
                title: 'Word from the DOS',
                subtitle: 'CURRICULUM & STUDIES',
                content: 'Our curriculum is designed to be balanced and engaging, meeting the requirements of the national education system while integrating practical vocational training. We focus on continuous assessment and personalized support to help students excel in their chosen fields of study.',
                image_url: '/hero-main.png',
                display_order: 5
            }
        ];

        for (const s of sections) {
            const [section, created] = await PageSection.findOrCreate({
                where: { section_key: s.section_key },
                defaults: s
            });
            if (created) console.log(`Created section: ${s.section_key}`);
            else console.log(`Section already exists: ${s.section_key}`);
        }

        console.log('Leadership Messages Seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();

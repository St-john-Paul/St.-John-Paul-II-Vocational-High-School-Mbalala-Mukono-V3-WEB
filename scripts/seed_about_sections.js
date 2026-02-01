import sequelize from '../server/config/database.js';
import { PageSection } from '../server/models/index.js';

const seed = async () => {
    try {
        await sequelize.sync();

        const sections = [
            {
                section_key: 'about_hero',
                title: 'About St. John Paul II',
                subtitle: 'YOUR SUCCESS BEGINS HERE',
                image_url: '/hero-main.png',
                display_order: 1
            },
            {
                section_key: 'about_intro',
                title: 'Our Story',
                subtitle: 'Our Journey',
                content: 'St. John Paul II Vocational Training Centre was established with a vision to bridge the gap...',
                image_url: '/facilities.png',
                display_order: 2
            },
            {
                section_key: 'about_leadership',
                title: 'Our Leadership',
                subtitle: 'Leadership',
                content: 'St. John Paul II Vocational & High School was established with dedicated team of professionals...',
                image_url: '/hero-main.png',
                button_text: 'Meet Our Leaders',
                button_link: '/leadership.html',
                display_order: 3
            },
            {
                section_key: 'about_facilities',
                title: 'World-Class Facilities',
                subtitle: 'Facilities',
                content: 'From state-of-the-art computer labs to fully equipped automotive and tailoring workshops...',
                image_url: '/facilities.png',
                button_text: 'Explore Our Campus',
                button_link: '/facilities.html',
                display_order: 4
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

        console.log('About Sections Seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();

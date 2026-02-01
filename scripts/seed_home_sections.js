import sequelize from '../server/config/database.js';
import { PageSection } from '../server/models/index.js';

const seed = async () => {
    try {
        await sequelize.sync();

        const sections = [
            {
                section_key: 'home_hero',
                title: 'Empowering Futures Through Education & Skills',
                subtitle: 'St. John Paul II Vocational & High School',
                content: 'Join us today for holistic academic excellence and practical vocational training.',
                image_url: '/hero-main.png',
                button_text: 'Join Us Today',
                button_link: '/admissions.html',
                display_order: 1
            },
            {
                section_key: 'home_goal',
                title: 'Our Goal',
                content: 'To equip our students with knowledge and practical skills to enable them become productive, creative, responsible, ethical to thrive and succeed in life.',
                display_order: 2
            },
            {
                section_key: 'home_mission',
                title: 'Our Mission',
                content: 'To provide quality education that is holistic, practical and accessible, aimed at nurturing graduates who are God-fearing, innovators and productive citizens of the global community.',
                display_order: 3
            },
            {
                section_key: 'home_vision',
                title: 'Our Vision',
                content: 'A leading centre of excellence in academic and vocational education, transforming lives through skills and character development.',
                display_order: 4
            },
            {
                section_key: 'home_stats',
                title: '15+, 500+, 20+, 98%',
                subtitle: 'Years Excellence, Current Students, Certified Courses, Employment Rate',
                display_order: 5
            },
            {
                section_key: 'about_mission',
                title: 'OUR MISSION',
                content: 'To provide high-quality vocational and academic education that empowers students with practical skills for self-reliance and national development.',
                display_order: 6
            },
            {
                section_key: 'about_vision',
                title: 'OUR VISION',
                content: 'To be the leading center of excellence in vocational training and academic brilliance in East Africa.',
                display_order: 7
            },
            {
                section_key: 'about_values',
                title: 'OUR VALUES',
                content: 'Integrity, Professionalism, Innovation, and Disciplined Service to Humanity.',
                display_order: 8
            }
        ];

        for (const s of sections) {
            const [section, created] = await PageSection.findOrCreate({
                where: { section_key: s.section_key },
                defaults: s
            });
            if (created) console.log(`Created home section: ${s.section_key}`);
            else console.log(`Home section already exists: ${s.section_key}`);
        }

        console.log('Home Dynamic Sections Seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();

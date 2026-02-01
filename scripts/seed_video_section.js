import sequelize from '../server/config/database.js';
import { PageSection } from '../server/models/index.js';

const seed = async () => {
    try {
        await sequelize.sync();

        const sections = [
            {
                section_key: 'videos_hero',
                title: 'Video Gallery',
                subtitle: 'WATCH OUR STORIES UNFOLD',
                image_url: '/hero-main.png', // Default
                display_order: 1
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

        console.log('Video Section Seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();

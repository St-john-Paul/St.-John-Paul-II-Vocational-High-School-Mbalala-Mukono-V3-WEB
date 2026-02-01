import { PageSection } from './server/models/index.js';

async function updateSection() {
    try {
        const newContent = `We take pride in providing a serene and well-facilitated environment that allows students to focus on their studies and personal growth. Our campus is designed to meet both academic and vocational standards, ensuring a balance between theory and practice.\n\nAt St. John Paul II, we recognize that infrastructure is a silent teacher. Our facilities are continuously upgraded to support the evolving needs of our students, from digital innovation to hands-on technical skills, ensuring every learner thrives in a modern setting.`;

        const [updated] = await PageSection.update(
            { content: newContent },
            { where: { section_key: 'facilities_intro' } }
        );

        console.log(`Updated ${updated} section content.`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateSection();

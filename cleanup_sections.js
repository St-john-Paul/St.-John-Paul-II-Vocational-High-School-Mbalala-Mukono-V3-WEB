import { PageSection } from './server/models/index.js';

async function cleanup() {
    try {
        const deleted = await PageSection.destroy({
            where: { section_key: 'about_facilities_photo' }
        });
        console.log(`Deleted ${deleted} redundant sections.`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

cleanup();

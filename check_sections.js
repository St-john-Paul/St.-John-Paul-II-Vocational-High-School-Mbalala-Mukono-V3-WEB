import { PageSection } from './server/models/index.js';

async function checkSections() {
    try {
        const sections = await PageSection.findAll();
        console.log('Current Sections in Database:');
        sections.forEach(s => {
            console.log(`- Key: ${s.section_key}, Title: ${s.title}, Image: ${s.image_url}`);
            console.log(`  Content: ${s.content ? s.content.substring(0, 100) + '...' : 'null'}`);
        });
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkSections();

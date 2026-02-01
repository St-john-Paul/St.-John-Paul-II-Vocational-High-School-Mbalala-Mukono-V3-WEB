import { sequelize, PageSection } from './server/models/index.js';

const sections = [
    {
        section_key: 'about_facilities',
        title: 'World-Class Facilities',
        subtitle: 'Environment',
        content: 'At St. John Paul II, we believe that the right environment is crucial for learning. Our campus is equipped with modern infrastructure that balances academic theory with practical, hands-on experience across all disciplines.',
        image_url: '/facilities.png',
        display_order: 10
    },
    {
        section_key: 'about_facility_science',
        title: 'Facilities - Science & ICT (About)',
        subtitle: 'fas fa-microscope',
        content: 'State-of-the-art laboratories for physics, chemistry, and biology, alongside a modern computer lab with high-speed internet.',
        display_order: 12
    },
    {
        section_key: 'about_facility_workshops',
        title: 'Facilities - Workshops (About)',
        subtitle: 'fas fa-tools',
        content: 'Fully equipped workshops for automotive engineering, tailoring, hairdressing, and building construction skills.',
        display_order: 13
    },
    {
        section_key: 'about_facility_sports',
        title: 'Facilities - Sports (About)',
        subtitle: 'fas fa-running',
        content: 'Extensive sports grounds for football, netball, and volleyball, promoting physical health and teamwork.',
        display_order: 14
    },
    {
        section_key: 'about_facility_library',
        title: 'Facilities - Library (About)',
        subtitle: 'fas fa-book-reader',
        content: 'A quiet and well-stocked library environment for research, independent study, and academic exploration.',
        display_order: 15
    },
    {
        section_key: 'about_facility_boarding',
        title: 'Facilities - Boarding (About)',
        subtitle: 'fas fa-bed',
        content: 'Separate, secure, and spacious dormitories for boys and girls, providing a safe "home away from home".',
        display_order: 16
    },
    {
        section_key: 'about_facility_agriculture',
        title: 'Facilities - Agriculture (About)',
        subtitle: 'fas fa-seedling',
        content: 'Dedicated space for modern farming techniques, poultry, and animal husbandry for practical vocational learning.',
        display_order: 17
    }
];

async function seedAboutFacilities() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        for (const section of sections) {
            const [s, created] = await PageSection.findOrCreate({
                where: { section_key: section.section_key },
                defaults: section
            });
            if (created) console.log(`Created: ${section.section_key}`);
            else {
                await s.update(section);
                console.log(`Updated: ${section.section_key}`);
            }
        }

        console.log('Seed About Facilities complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

seedAboutFacilities();

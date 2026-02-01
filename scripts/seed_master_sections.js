import sequelize from '../server/config/database.js';
import { PageSection } from '../server/models/index.js';

const seed = async () => {
    try {
        await sequelize.sync();

        const sections = [
            // About Page
            {
                section_key: 'about_facilities',
                title: 'World-Class Facilities',
                subtitle: 'OUR CAMPUS',
                content: 'We provide a serene and well-facilitated environment that allows students to focus on their studies and personal growth.',
                image_url: '/facilities.png',
                display_order: 4
            },
            {
                section_key: 'about_accreditation',
                title: 'Officially Accredited Institution',
                subtitle: 'Trust & Recognition',
                content: 'St. John Paul II Vocational & High School is fully licensed by the Ministry of Education and Sports and UNEB.',
                image_url: '/logo.png',
                display_order: 5
            },
            // Facilities Page
            {
                section_key: 'facilities_workshops',
                title: 'Vocational Workshops',
                subtitle: 'PRACTICAL SKILLS',
                content: 'Our school is equipped with modern workshops for mechanics, tailoring, ICT, and more.',
                image_url: '/hero-main.png',
                display_order: 2
            },
            {
                section_key: 'facilities_intro',
                title: 'Conducive Learning Environment',
                subtitle: 'Overview',
                content: 'We take pride in providing a serene and well-facilitated environment that allows students to focus on their studies and personal growth.',
                image_url: '/hero-main.png',
                display_order: 1
            },
            // Academics Page
            {
                section_key: 'academics_hero',
                title: 'Academic Performance',
                subtitle: 'A TRADITION OF EXCELLENCE AND SUCCESS',
                image_url: '/hero-main.png',
                display_order: 1
            },
            {
                section_key: 'academics_intro',
                title: 'UNEB Results Highlights',
                subtitle: 'Track Record',
                content: 'We consistently rank among the top-performing schools in the Mukono district.',
                image_url: '/hero-main.png',
                display_order: 2
            },
            // Hero Sections for Requested Pages
            {
                section_key: 'mission_hero',
                title: 'Our Purpose & Values',
                subtitle: 'YOUR SUCCESS BEGINS HERE',
                image_url: '/hero-main.png',
                display_order: 1
            },
            {
                section_key: 'leadership_hero',
                title: 'Our Leadership',
                subtitle: 'NURTURING EXCELLENCE THROUGH VISIONARY GOVERNANCE',
                image_url: '/hero-main.png',
                display_order: 1
            },
            {
                section_key: 'staff_hero',
                title: 'Meet Our Staff',
                subtitle: 'THE DEDICATED TEAM BEHIND OUR SUCCESS',
                image_url: '/hero-main.png',
                display_order: 1
            },
            {
                section_key: 'fees_hero',
                title: 'Fees Structure',
                subtitle: 'YOUR SUCCESS BEGINS HERE',
                image_url: '/hero-main.png',
                display_order: 1
            },
            {
                section_key: 'requirements_hero',
                title: 'Requirements',
                subtitle: 'PREPARING FOR EXCELLENCE',
                image_url: '/hero-main.png',
                display_order: 1
            },
            {
                section_key: 'news_hero',
                title: 'News & Updates',
                subtitle: 'STAY INFORMED WITH OUR LATEST STORIES',
                image_url: '/hero-main.png',
                display_order: 1
            },
            {
                section_key: 'events_hero',
                title: 'School Events',
                subtitle: 'EXCITING ACTIVITIES AND IMPORTANT DATES',
                image_url: '/hero-main.png',
                display_order: 1
            },
            {
                section_key: 'videos_hero',
                title: 'Video Gallery',
                subtitle: 'WATCH OUR STORIES UNFOLD',
                image_url: '/hero-main.png',
                display_order: 1
            },
            {
                section_key: 'clubs_hero',
                title: 'School Clubs',
                subtitle: 'YOUR SUCCESS BEGINS HERE',
                image_url: '/hero-main.png',
                display_order: 1
            },
            {
                section_key: 'faqs_hero',
                title: 'Frequently Asked Questions',
                subtitle: 'Find answers to common questions about admissions, academics, and school life.',
                image_url: '/hero-main.png',
                display_order: 1
            },
            {
                section_key: 'gallery_hero',
                title: 'Campus Gallery',
                subtitle: 'YOUR SUCCESS BEGINS HERE',
                image_url: '/hero-main.png',
                display_order: 1
            },
            // News Page Specific Content
            {
                section_key: 'news_featured',
                title: 'Exam Timetable Released',
                subtitle: 'ACADEMIC',
                content: 'The end-of-term examination timetable has been released. Please check with your class teachers for the detailed schedule.',
                image_url: '/hero-main.png',
                display_order: 2
            },
            {
                section_key: 'news_side_1',
                title: 'Sports Day Success',
                subtitle: '1/26/2026',
                content: 'Congratulations to all students who participated in our annual sports day.',
                image_url: '/facilities.png',
                display_order: 3
            },
            {
                section_key: 'news_side_2',
                title: 'New Science Lab Opening',
                subtitle: '1/26/2026',
                content: 'We are excited to announce the opening of our state-of-the-art science lab.',
                image_url: '/facilities.png',
                display_order: 4
            },
            {
                section_key: 'news_side_3',
                title: '2026 Admissions Open',
                subtitle: '1/24/2026',
                content: 'We are pleased to announce that admissions for S.1 and S.5 are now open.',
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

        console.log('Master Section Seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();

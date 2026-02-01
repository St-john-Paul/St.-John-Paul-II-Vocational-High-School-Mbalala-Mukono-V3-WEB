import { sequelize, PageSection } from './server/models/index.js';

const sections = [
    // ================= ADMISSIONS PAGE =================
    {
        section_key: 'admissions_hero',
        title: 'Admissions',
        subtitle: 'NURTURING TALENT & ACADEMIC BRILLIANCE',
        content: '',
        image_url: '',
        display_order: 1
    },
    {
        section_key: 'admissions_roadmap_intro',
        title: 'How to Join Us',
        subtitle: 'The Roadmap',
        content: '',
        image_url: '',
        display_order: 2
    },

    // ================= STUDENT LIFE PAGE =================
    {
        section_key: 'student_life_hero',
        title: 'Student Life',
        subtitle: 'NURTURING CHARACTER, SKILLS & COMMUNITY',
        content: '',
        image_url: '',
        display_order: 1
    },
    {
        section_key: 'student_life_boarding',
        title: 'Boarding & Facilities',
        subtitle: 'A Home Away From Home',
        content: 'Our student residences are designed to provide a safe, comfortable, and disciplined environment. We separate dormitories for boys and girls, each managed by dedicated resident wardens and matrons.',
        image_url: '/facilities.png',
        display_order: 2
    },
    {
        section_key: 'student_life_health',
        title: 'Health & Nutrition',
        subtitle: '',
        content: 'We prioritize a balanced diet to keep our students energetic and healthy.',
        image_url: '',
        display_order: 3
    },
    {
        section_key: 'student_life_leadership',
        title: 'Student Governance',
        subtitle: '',
        content: 'We believe in empowering students through leadership. Our Prefectorial Body is democratically elected and plays a vital role in school management and student welfare.',
        image_url: '/hero-main.png',
        display_order: 4
    },

    // ================= FACILITIES PAGE =================
    {
        section_key: 'facilities_hero',
        title: 'School Facilities',
        subtitle: 'MODERN INFRASTRUCTURE FOR HOLISTIC LEARNING',
        content: '',
        image_url: '',
        display_order: 1
    },
    {
        section_key: 'facilities_intro',
        title: 'Conducive Learning Environment',
        subtitle: '',
        content: 'We take pride in providing a serene and well-facilitated environment that allows students to focus on their studies and personal growth. Our campus is designed to meet both academic and vocational standards.',
        image_url: '/hero-main.png',
        display_order: 2
    },

    // ================= CONTACT PAGE =================
    {
        section_key: 'contact_hero',
        title: 'Get in Touch',
        subtitle: 'YOUR SUCCESS BEGINS HERE',
        content: '',
        image_url: '',
        display_order: 1
    },
    {
        section_key: 'contact_location',
        title: 'Visit Us at Mbalala-Mukono',
        subtitle: 'Our Location',
        content: '',
        image_url: '',
        display_order: 2
    },

    // ================= INDEX PAGE LEADERSHIP MESSAGES =================
    {
        section_key: 'chairman_message',
        title: 'Message from the Chairman',
        subtitle: 'Board of Governors',
        content: 'Welcome to St. John Paul II Vocational & High School. As Chairman of the Board of Governors, I am proud to lead an institution dedicated to academic excellence and practical skills development. Our commitment is to nurture well-rounded individuals who will contribute positively to society. We provide a safe, inclusive environment where every student can thrive and reach their full potential.',
        image_url: '/hero-main.png',
        display_order: 1
    },
    {
        section_key: 'head_prefect_message',
        title: 'Message from the Head Prefect',
        subtitle: 'Student Leadership',
        content: 'As Head Prefect, I represent the student body in ensuring that our school remains a place of growth, discipline, and unity. St. John Paul II has given me countless opportunities to develop leadership skills and academic excellence. I encourage all students to embrace every opportunity, participate actively in school activities, and uphold our values of integrity and respect.',
        image_url: '/facilities.png',
        display_order: 2
    },

    // ================= GALLERY PAGE =================
    {
        section_key: 'gallery_hero',
        title: 'Our Gallery',
        subtitle: 'Life at St. John Paul II',
        content: '',
        image_url: '',
        display_order: 1
    }
];

async function seedAdditionalSections() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        for (const section of sections) {
            const [s, created] = await PageSection.findOrCreate({
                where: { section_key: section.section_key },
                defaults: section
            });
            if (created) console.log(`Created: ${section.section_key}`);
            else console.log(`Exists: ${section.section_key}`);
        }

        console.log('Seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

seedAdditionalSections();

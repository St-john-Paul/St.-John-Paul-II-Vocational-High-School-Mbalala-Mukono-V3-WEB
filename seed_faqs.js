import { sequelize, FAQ } from './server/models/index.js';

const faqs = [
    // 1. Admissions & Fees
    {
        category: 'Admissions',
        question: 'How do I apply for admission?',
        answer: 'You can apply by visiting the school bursar’s office to pick up a physical application form. Alternatively, you can download the form from the "Admissions" section of our website, fill it out, and submit it via email or in person. We are open Monday to Friday, 8:00 AM to 5:00 PM.',
        display_order: 1
    },
    {
        category: 'Admissions',
        question: 'What is the complete fee structure?',
        answer: 'Our fee structure varies depending on the class level (O-Level vs A-Level) and whether the student is a Boarder or Day Scholar. Boarding fees cover tuition, meals, and accommodation. Day fees cover tuition and lunch. Please contact the Bursar at 0777 609 907 for the most up-to-date fee schedule.',
        display_order: 2
    },
    {
        category: 'Admissions',
        question: 'Are there bursaries or scholarship opportunities?',
        answer: 'Yes, St. John Paul II offering limited partial bursaries. These are awarded to highly talented students in Sports (Football, Netball) and Music, Dance & Drama (MDD). We also offer academic scholarships to top-performing students in national examinations (PLE and UCE).',
        display_order: 3
    },
    {
        category: 'Admissions',
        question: 'When does the new term begin?',
        answer: 'Academic terms usually follow the Ministry of Education calendar. For the 2026 academic year, Term 1 begins on February 5th. All new students are expected to report on the official opening date for orientation.',
        display_order: 4
    },
    {
        category: 'Admissions',
        question: 'What are the requirements for new students?',
        answer: 'New students must provide their previous academic results (PLE/UCE pass slips), a recommendation letter from their former school, 2 passport-sized photos, and a copy of the parent’s ID. Boarders additionally need to provide medical forms.',
        display_order: 5
    },

    // 2. Academics & Vocational Skills
    {
        category: 'Academics',
        question: 'What vocational courses are available?',
        answer: 'We pride ourselves on dual-curriculum education. We offer: Automotive Mechanics, Tailoring & Fashion Design, ICT & Computer Studies, Carpentry & Joinery, Electrical Installation, and Building & Construction. Every student gains practical, marketable skills.',
        display_order: 6
    },
    {
        category: 'Academics',
        question: 'Is vocational training compulsory for all students?',
        answer: 'Yes, for Lower Secondary (S.1-S.3), choosing one vocational skill is compulsory as per the new curriculum. For A-Level students, vocational training is optional but highly recommended to ensure they leave with a certificate of competence.',
        display_order: 7
    },
    {
        category: 'Academics',
        question: 'Do students receive nationally recognized certificates?',
        answer: 'Absolutely. Our vocational courses are assessed by the Directorate of Industrial Training (DIT). Successful students receive a DIT Level 1 or Level 2 Worker’s Pass, which is recognized nationwide for employment.',
        display_order: 8
    },
    {
        category: 'Academics',
        question: 'What subject combinations are offered at A-Level?',
        answer: 'We offer a wide range of combinations for both Sciences (PCM, BCM, PEM, MEG) and Arts (HEL, HEG, DEG, LEG). We also support subsidiaries like ICT and Sub-Math. Our Director of Studies can guide you on the best combination for your career path.',
        display_order: 9
    },
    {
        category: 'Academics',
        question: 'How does the school perform in national exams (UNEB)?',
        answer: 'We have consistently registered First Grades in both UCE and UACE. Our practical approach aids academic understanding, leading to excellent performance in science subjects particularly. Check our "Results" page for specific yearly statistics.',
        display_order: 10
    },

    // 3. Boarding & School Life
    {
        category: 'Boarding',
        question: 'Is the school Day or Boarding?',
        answer: 'We are a mixed school offering both Day and Boarding sections. Our boarding facilities feature separate, secure, and spacious dormitories for boys and girls, with 24/7 distinct matrons and warden supervision.',
        display_order: 11
    },
    {
        category: 'Boarding',
        question: 'What items must a boarder bring?',
        answer: 'Boarders must bring a standard metallic suitcase, a mattress (usually 3ft), bedsheets, a mosquito net, personal toiletries, and full school uniform sets. Civilians clothes are generally not allowed. A detailed checklist is issued on admission.',
        display_order: 12
    },
    {
        category: 'Boarding',
        question: 'What is the school offering on Visiting Days?',
        answer: 'Visiting Days are officially the first Sunday of every month. Parents are allowed to visit between 2:00 PM and 5:00 PM. Parents can check on their child\'s academic progress and bring essential edibles (grab) as per school regulations.',
        display_order: 13
    },
    {
        category: 'Boarding',
        question: 'How are student health and medical emergencies handled?',
        answer: 'We have a dedicated sickbay staffed by a qualified full-time nurse to handle minor ailments and first aid. For more serious conditions, the school has a partnership with a nearby hospital, and parents are notified immediately.',
        display_order: 14
    },
    {
        category: 'Boarding',
        question: 'What is the daily routine like for a student?',
        answer: 'The day starts with morning preps at 5:00 AM, followed by breakfast and assembly. Classes run from 8:00 AM to 4:00 PM, with breaks for tea and lunch. After classes, there is time for sports and games, followed by evening prep and supper. It is a structured, balanced day.',
        display_order: 15
    },

    // 4. Co-curricular & Discipline
    {
        category: 'General',
        question: 'What sports activities are offered?',
        answer: 'We believe in physical fitness. We have competitive teams in Football (Boys & Girls), Netball, Volleyball, and Athletics. We actively participate in post-primary district and regional championships.',
        display_order: 16
    },
    {
        category: 'General',
        question: 'Which clubs and societies can students join?',
        answer: 'Student life is vibrant here. We have the PCT/ICT Club, Writers & Debating Club, Wildlife & Environment Club, Scouts & Girl Guides, YCS (Young Christian Students), and Scripture Union. All students are encouraged to join at least one.',
        display_order: 17
    },
    {
        category: 'General',
        question: 'What is the policy on mobile phones and gadgets?',
        answer: 'Strictly prohibited. Possession of mobile phones, tablets, or unauthorized electronic gadgets is a major disciplinary offense. If found, the item is confiscated permanently, and the student faces suspension or expulsion.',
        display_order: 18
    },
    {
        category: 'General',
        question: 'What religious denominations are supported?',
        answer: 'St. John Paul II is a Catholic-founded school, but we are open to all faiths. We uphold Catholic values while ensuring freedom of worship for Anglicans (Protestants) and Muslims, with dedicated time and space for their prayers.',
        display_order: 19
    },
    {
        category: 'General',
        question: 'How does the school handle discipline?',
        answer: 'We prioritize Guidance and Counseling to mold behavior. However, we have a clear code of conduct. Minor offenses are handled through counseling and community service, while major offenses (bullying, theft, indiscipline) face the Disciplinary Committee.',
        display_order: 20
    }
];

async function seedFAQs() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Remove existing to avoid duplicates/clutter
        await FAQ.destroy({ where: {}, truncate: true });
        console.log('Cleared existing FAQs.');

        for (const faq of faqs) {
            await FAQ.create(faq);
        }

        console.log('Successfully seeded 20 detailed FAQs.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding FAQs:', error);
        process.exit(1);
    }
}

seedFAQs();

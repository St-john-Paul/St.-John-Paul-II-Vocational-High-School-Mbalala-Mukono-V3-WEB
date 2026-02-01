import sequelize from '../server/config/database.js';
import { PageSection } from '../server/models/index.js';

const seed = async () => {
    try {
        await sequelize.sync();

        const sections = [
            {
                section_key: 'about_director',
                title: 'Word from the Director',
                subtitle: 'VISIONARY LEADERSHIP',
                content: 'Welcome to St. John Paul II Vocational & High School, a center dedicated to the holistic transformation of the young generation. As the Director, my vision has always been to create an environment where academic excellence meets practical ingenuity. We live in a rapidly changing world where traditional degrees alone are no longer enough; hence, we have integrated a robust vocational curriculum that empowers our students with self-reliance from day one. Our commitment is to produce graduates who are not only intellectually capable but also ethically grounded and technically skilled. We invite you to join our community and experience an education that truly prepares you for the challenges and opportunities of the 21st century. Together, we are building a legacy of innovation, discipline, and success.',
                image_url: '/hero-main.png',
                display_order: 3
            },
            {
                section_key: 'about_deputy',
                title: 'Word from the Deputy HEAD Teacher',
                subtitle: 'ACADEMIC EXCELLENCE & DISCIPLINE',
                content: 'In my role as the Deputy Head Teacher, my primary focus is the maintenance of high academic standards and the cultivation of a disciplined, values-based student body. At St. John Paul II, we understand that discipline is the bridge between goals and accomplishment. Our teaching methodology is student-centered, ensuring that no learner is left behind. We pride ourselves on our consistent performance in UNEB examinations and our ability to take students of varying backgrounds and turn them into national top-performers. We maintain a close partnership with parents and guardians, believing that the upbringing of a child is a collaborative effort. Our students are nurtured to be leaders of character who can stand tall in any professional or social setting.',
                image_url: '/facilities.png',
                display_order: 4
            },
            {
                section_key: 'about_dos',
                title: 'Word from the DOS',
                subtitle: 'CURRICULUM INNOVATION',
                content: 'Academic planning and curriculum delivery are the heartbeats of our institution. As the Director of Studies (DOS), I am dedicated to ensuring that our dual-curriculum system—combining traditional academic subjects with DIT-certified vocational training—is delivered with the highest level of professionalism. We have invested heavily in modern teaching aids and regular training for our staff to stay abreast of the latest educational trends. Our termly assessments are designed not just to test memory, but to challenge critical thinking and practical application of knowledge. We monitor every student\'s progress closely, providing remedial support where necessary and pushing the gifted learners to even greater heights. At St. John Paul II, we don\'t just teach; we inspire a lifelong love for learning.',
                image_url: '/hero-main.png',
                display_order: 5
            },
            {
                section_key: 'about_facilities',
                title: 'World-Class Learning Facilities',
                subtitle: 'A CONDUCIVE ENVIRONMENT',
                content: 'The quality of an education is often reflected in the environment where it takes place. St. John Paul II boasts state-of-the-art facilities that rival the best institutions in the region. Our science laboratories are fully equipped for practical experimentation, while our computer labs provide 1:1 machine-to-student access for digital literacy. For our vocational trainees, we have established professional-grade workshops for Motor Vehicle Mechanics, Tailoring & Fashion Design, Catering & Hotel Management, and Building Construction. Our campus is more than just classrooms; it is a sprawling greenery-rich environment designed for focus and physical well-being. From our spacious and secure dormitories to our multi-purpose sports fields, every corner of our campus is built to foster growth, safety, and a sense of community.',
                image_url: '/facilities.png',
                display_order: 6
            }
        ];

        for (const s of sections) {
            const [section, created] = await PageSection.findOrCreate({
                where: { section_key: s.section_key },
                defaults: s
            });
            if (created) console.log(`Created detailed section: ${s.section_key}`);
            else console.log(`Section already exists: ${s.section_key}`);
        }

        console.log('Detailed Content Seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();

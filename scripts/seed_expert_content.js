import sequelize from '../server/config/database.js';
import { PageSection } from '../server/models/index.js';

const seed = async () => {
    try {
        await sequelize.sync();

        const sections = [
            {
                section_key: 'about_director',
                title: 'Word from the Director',
                subtitle: 'A LEGACY OF TRANSFORMATION',
                content: 'At St. John Paul II Vocational & High School, our journey is defined by a deep-rooted commitment to transforming the lives of young people through the power of holistic education. As the Director, I have witnessed first-hand how the right combination of academic theory and practical vocational skills can break cycles of poverty and ignite hope. Our institution was founded on the principles of faith, integrity, and hard work, drawing inspiration from our patron saint to serve with love and excellence. We do not just teach subjects; we nurture the whole person—their heart, mind, and hands. Our goal is to ensure that every graduate departs our gates not only with a certificate but with the confidence to navigate the complexities of the modern global economy. We are building a community where innovation is encouraged, discipline is a way of life, and success is measured by the positive impact our students make in society. I personally invite you to be part of this transformative journey as we shape the leaders and innovators of tomorrow.',
                image_url: '/hero-main.png',
                display_order: 3
            },
            {
                section_key: 'about_deputy',
                title: 'Word from the Deputy HEAD Teacher',
                subtitle: 'CHARACTER & DISCIPLINE',
                content: 'Discipline and excellence are the dual pillars upon which the success of St. John Paul II Vocational & High School stands. In my capacity as the Deputy Head Teacher, my mission is to foster an environment where character development is prioritized alongside intellectual growth. We believe that true education goes beyond the classroom; it encompasses the cultivation of life skills, emotional intelligence, and a strong moral compass. Our students are held to the highest standards of conduct, taught to respect themselves and others, and encouraged to embrace responsibility as a prerequisite for leadership. We have implemented a robust mentorship program that ensures every learner receives the individual guidance they need to navigate the challenges of adolescence and academia. Furthermore, we value the indispensable role of parents and guardians in the educational process, maintaining an open-door policy for collaboration. When you entrust your child to us, you are placing them in a sanctuary of learning where their potential is recognized, their talents are honed, and their future is our primary concern.',
                image_url: '/facilities.png',
                display_order: 4
            },
            {
                section_key: 'about_dos',
                title: 'Word from the DOS',
                subtitle: 'ACADEMIC RIGOUR & INNOVATION',
                content: 'The academic heartbeat of St. John Paul II is a dynamic blend of traditional academic rigour and cutting-edge vocational training. As the Director of Studies (DOS), I am proud to lead an academic program that is uniquely tailored to the demands of the 21st-century job market. Our dual-curriculum approach integrates standard secondary education with DIT-certified vocational specializations, ensuring that our students are never limited to a single path of success. We employ modern pedagogical techniques that move away from rote memorization toward critical thinking, problem-solving, and hands-on application. Our faculty undergoes continuous professional development to master the latest educational technologies and teaching methodologies. We maintain a rigorous system of continuous assessment, providing regular feedback to both students and parents to ensure steady growth. Whether a student is preparing for national UNEB examinations or mastering a complex technical trade, we provide the resources, the expertise, and the unrelenting support necessary to achieve top-tier results. Excellence is not an act for us; it is a habit that we instill in every student through careful planning and dedicated instruction.',
                image_url: '/hero-main.png',
                display_order: 5
            },
            {
                section_key: 'about_facilities',
                title: 'World-Class Learning Facilities',
                subtitle: 'OUR CAMPUS ENVIRONMENT',
                content: 'Our campus is a testament to our belief that a world-class education deserves a world-class environment. St. John Paul II is situated on a sprawling, serene campus that provides the perfect backdrop for intensive study and personal reflection. Our infrastructure is meticulously designed to meet the highest safety and functional standards. Our science wing features state-of-the-art laboratories for Physics, Chemistry, and Biology, equipped with modern apparatus for thorough experimentation. Our ICT department boasts multiple computer labs with high-speed internet and the latest software, ensuring every student is digitally literate. For vocational excellence, we have established industrial-grade workshops for Motor Vehicle Mechanics, Tailoring, Building Construction, and Catering, where students work with the same tools used in professional industries. Beyond the classroom, we provide safe and comfortable boarding facilities that feel like a \'home away from home,\' and expansive sports grounds for physical development. We have invested in reliable green energy solutions and clean water systems to ensure a sustainable and healthy campus for all. Every brick laid at St. John Paul II is a commitment to providing our students with the best possible platform to launch their dreams.',
                image_url: '/facilities.png',
                display_order: 6
            }
        ];

        for (const s of sections) {
            const [section, created] = await PageSection.findOrCreate({
                where: { section_key: s.section_key },
                defaults: s
            });
            if (created) console.log(`Created expert section: ${s.section_key}`);
            else console.log(`Section already exists: ${s.section_key}`);
        }

        console.log('Expert Content Seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();

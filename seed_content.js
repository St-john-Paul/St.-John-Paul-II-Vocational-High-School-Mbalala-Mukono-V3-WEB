import { sequelize, Post, Testimonial, Document, CalendarEvent } from './server/models/index.js';

// 1. News & Events (10 Items)
const news = [
    {
        title: '2026 Admissions Open',
        category: 'Announcement',
        content: 'We are pleased to announce that admissions for S.1 and S.5 for the academic year 2026 are now open. Interviews will be conducted daily at the school campus.',
        event_date: '2026-01-10',
        image_url: '/hero-main.png'
    },
    {
        title: 'Outstanding UCE Results',
        category: 'News',
        content: 'Congratulations to our 2025 candidates for the excellent performance in UCE exams. We registered 85% First Grades.',
        event_date: '2026-02-15',
        image_url: '/facilities.png'
    },
    {
        title: 'New Computer Lab Commissioned',
        category: 'News',
        content: 'The new state-of-the-art computer laboratory has been officially opened. This will boost our ICT training and digital literacy programs.',
        event_date: '2026-03-01',
        image_url: '/hero-main.png'
    },
    {
        title: 'Sports Day 2026',
        category: 'Event',
        content: 'Join us for our annual Sports Day featuring athletics, football, and netball competitions. Parents and guardians are welcome.',
        event_date: '2026-04-12',
        image_url: '/hero-main.png'
    },
    {
        title: 'Music, Dance & Drama Festivals',
        category: 'Event',
        content: 'Our school choir qualified for the National MDD competitions. Rehearsals are underway.',
        event_date: '2026-05-20',
        image_url: '/hero-main.png'
    },
    {
        title: 'Prefects Induction Ceremony',
        category: 'Event',
        content: 'The newly elected student leaders will be sworn in this Friday. We wish them a successful term of office.',
        event_date: '2026-06-05',
        image_url: '/hero-main.png'
    },
    {
        title: 'Vocational Exhibition',
        category: 'Event',
        content: 'Students will showcase their projects in carpentry, mechanics, and fashion design. Come see practical skills in action.',
        event_date: '2026-07-15',
        image_url: '/facilities.png'
    },
    {
        title: 'Career Guidance Day',
        category: 'Event',
        content: 'We shall host professionals from various fields to guide our S.4 and S.6 students on career choices.',
        event_date: '2026-08-10',
        image_url: '/hero-main.png'
    },
    {
        title: 'Construction of New Girls Dormitory',
        category: 'News',
        content: 'Construction of the new multi-storied girls\' dormitory has commenced to accommodate the increasing number of learners.',
        event_date: '2026-09-01',
        image_url: '/facilities.png'
    },
    {
        title: 'End of Year Party',
        category: 'Event',
        content: 'The school will close the year with a thanksgiving mass and party for staff and students.',
        event_date: '2026-11-28',
        image_url: '/hero-main.png'
    }
];

// 2. Testimonials (10 Items)
const testimonials = [
    { author_name: 'Nakitende Prossy', author_title: 'Alumna, 2023', content: 'The vocational training at St. John Paul II changed my life. I now run my own fashion design shop.', author_photo: '/assets/avatars/avatar1.png' },
    { author_name: 'Mr. Ssekandi John', author_title: 'Parent', content: 'I am impressed by the discipline and academic focus. My son has improved greatly since joining.', author_photo: '/assets/avatars/avatar2.png' },
    { author_name: 'Okello Michael', author_title: 'S.4 Student', content: 'The teachers are very supportive. I enjoy the practical science lessons in the labs.', author_photo: '/assets/avatars/avatar3.png' },
    { author_name: 'Mrs. Nalubega Ritah', author_title: 'Parent', content: 'The boarding facilities are safe and clean. I have peace of mind knowing my daughter is well cared for.', author_photo: '/assets/avatars/avatar4.png' },
    { author_name: 'Mubiru Ivan', author_title: 'Old Boy', content: 'Starting my mechanics course here gave me a head start in engineering at university.', author_photo: '/assets/avatars/avatar5.png' },
    { author_name: 'Alowo Mercy', author_title: 'Student Leader', content: 'Leadership opportunities here have built my confidence and public speaking skills.', author_photo: '/assets/avatars/avatar6.png' },
    { author_name: 'Fr. Mukasa Joseph', author_title: 'Guardian', content: 'A school that values spiritual growth alongside academics is rare. Keep it up!', author_photo: '/assets/avatars/avatar1.png' },
    { author_name: 'Dr. Kasozi Paul', author_title: 'Parent', content: 'Affordable fees with high value. The dual curriculum is the future of education.', author_photo: '/assets/avatars/avatar2.png' },
    { author_name: 'Namaganda Sarah', author_title: 'S.6 Student', content: 'The career guidance helped me choose the right combination for Medicine.', author_photo: '/assets/avatars/avatar3.png' },
    { author_name: 'Tumwesigye David', author_title: 'Alumni', content: 'I learned discipline and time management here, which has helped me in my career.', author_photo: '/assets/avatars/avatar4.png' }
];

// 3. Documents
const documents = [
    { title: 'Admissions Form 2026', category: 'forms', file_url: '/uploads/admission_form_2026.pdf', description: 'Application form for new entrants' },
    { title: 'School Rules & Regulations', category: 'policies', file_url: '/uploads/school_rules.pdf', description: 'Code of conduct for students' },
    { title: 'Fee Structure Terms I-III', category: 'general', file_url: '/uploads/fee_structure_2026.pdf', description: 'Detailed breakdown of fees' },
    { title: 'Medical Examination Form', category: 'forms', file_url: '/uploads/medical_form.pdf', description: 'Mandatory health form' },
    { title: 'Term I 2026 Calendar', category: 'calendars', file_url: '/uploads/term1_calendar.pdf', description: 'Key dates and activities' },
    { title: 'Boarding Requirements List', category: 'general', file_url: '/uploads/boarding_reqs.pdf', description: 'Items to bring' }
];

// 4. Calendar Events
const events = [
    { title: 'Term I Opening', event_date: '2026-02-05', event_type: 'event', is_important: true },
    { title: 'S.1 Reporting', event_date: '2026-02-10', event_type: 'event', is_important: true },
    { title: 'Visitation Day', event_date: '2026-03-05', event_type: 'event', is_important: false },
    { title: 'Good Friday Holiday', event_date: '2026-04-03', event_type: 'holiday', is_important: true },
    { title: 'Easter Sunday', event_date: '2026-04-05', event_type: 'holiday', is_important: true },
    { title: 'Mid-Term Exams Start', event_date: '2026-03-20', event_type: 'exam', is_important: false },
    { title: 'Term I Closing', event_date: '2026-05-08', event_type: 'event', is_important: true }
];

async function seedContent() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Insert new data (Only if not exists)
        console.log('Verifying content data...');

        for (const item of news) {
            await Post.findOrCreate({ where: { title: item.title }, defaults: item });
        }
        for (const item of testimonials) {
            await Testimonial.findOrCreate({ where: { author_name: item.author_name, content: item.content }, defaults: item });
        }
        for (const item of documents) {
            await Document.findOrCreate({ where: { title: item.title }, defaults: item });
        }
        for (const item of events) {
            await CalendarEvent.findOrCreate({ where: { title: item.title, event_date: item.event_date }, defaults: item });
        }

        console.log('Successfully seeded Website Content (News, Testimonials, Docs, Calendar).');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding content:', error);
        process.exit(1);
    }
}

seedContent();

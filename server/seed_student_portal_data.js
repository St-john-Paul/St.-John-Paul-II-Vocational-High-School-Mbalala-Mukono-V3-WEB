import { sequelize, Student, Mark, Subject, Post, CalendarEvent, Document } from './models/index.js';

const seedStudentPortalData = async () => {
    try {
        await sequelize.authenticate();
        console.log('Seeding Student Portal Demo Data...');

        // 1. Find the demo student
        const demoStudent = await Student.findOne({ where: { reg_number: 'STUD001' } });
        if (!demoStudent) {
            console.error('Demo student not found. Run create_default_student.js first.');
            process.exit(1);
        }

        // 2. Find or create subjects
        const subjects = [
            { code: 'MTC', name: 'Mathematics' },
            { code: 'ENG', name: 'English' },
            { code: 'PHY', name: 'Physics' },
            { code: 'BIO', name: 'Biology' },
            { code: 'HIS', name: 'History' }
        ];

        for (const sub of subjects) {
            await Subject.findOrCreate({
                where: { code: sub.code },
                defaults: { name: sub.name, is_core: true, category: 'O-Level' }
            });
        }

        // 3. Create Marks for demo student
        const marksData = [
            { subject_code: 'MTC', term: 'Term 1', year: 2024, score: 85, grading: 'A' },
            { subject_code: 'ENG', term: 'Term 1', year: 2024, score: 78, grading: 'B+' },
            { subject_code: 'PHY', term: 'Term 1', year: 2024, score: 92, grading: 'A+' },
            { subject_code: 'BIO', term: 'Term 1', year: 2024, score: 75, grading: 'B' },
            { subject_code: 'HIS', term: 'Term 1', year: 2024, score: 88, grading: 'A' }
        ];

        for (const m of marksData) {
            const subject = await Subject.findOne({ where: { code: m.subject_code } });
            await Mark.findOrCreate({
                where: {
                    student_id: demoStudent.id,
                    subject_id: subject.id,
                    term: m.term,
                    year: m.year
                },
                defaults: { score: m.score, grading: m.grading }
            });
        }
        console.log('✅ Student marks created');

        // 4. Create News Posts
        const newsData = [
            {
                title: 'New Science Lab Opening',
                content: 'We are excited to announce the opening of our state-of-the-art science laboratory. Students will have access to modern equipment for practical experiments.',
                category: 'News',
                published: true
            },
            {
                title: 'Sports Day Success',
                content: 'Congratulations to all students who participated in our annual sports day. The event was a great success with record-breaking performances.',
                category: 'Events',
                published: true
            },
            {
                title: 'Exam Timetable Released',
                content: 'The end-of-term examination timetable has been released. Please check with your class teachers for the detailed schedule.',
                category: 'Academic',
                published: true
            }
        ];

        for (const news of newsData) {
            await Post.findOrCreate({
                where: { title: news.title },
                defaults: news
            });
        }
        console.log('✅ News posts created');

        // 5. Create Calendar Events
        const eventsData = [
            {
                title: 'Parent-Teacher Meeting',
                event_date: new Date('2024-03-15'),
                event_type: 'meeting',
                description: 'Quarterly parent-teacher conference to discuss student progress.'
            },
            {
                title: 'Science Fair',
                event_date: new Date('2024-04-20'),
                event_type: 'academic',
                description: 'Annual science fair exhibition showcasing student projects.'
            },
            {
                title: 'Term Break',
                event_date: new Date('2024-05-01'),
                event_type: 'holiday',
                description: 'School closes for mid-term break. Resumes May 15th.',
                is_important: true
            }
        ];

        for (const event of eventsData) {
            await CalendarEvent.findOrCreate({
                where: { title: event.title },
                defaults: event
            });
        }
        console.log('✅ Calendar events created');

        // 6. Create Documents
        const documentsData = [
            {
                title: 'School Handbook 2024',
                category: 'handbook',
                file_url: '/documents/handbook-2024.pdf',
                description: 'Complete student handbook with rules and regulations'
            },
            {
                title: 'Term 1 Syllabus',
                category: 'academic',
                file_url: '/documents/term1-syllabus.pdf',
                description: 'Detailed syllabus for all subjects in Term 1'
            },
            {
                title: 'Permission Slip Form',
                category: 'form',
                file_url: '/documents/permission-slip.pdf',
                description: 'Standard permission slip for school trips and events'
            }
        ];

        for (const doc of documentsData) {
            await Document.findOrCreate({
                where: { title: doc.title },
                defaults: doc
            });
        }
        console.log('✅ Documents created');

        console.log('\n🎉 Student Portal Demo Data Seeded Successfully!');
        console.log('   - 5 subjects added');
        console.log('   - 5 marks for demo student');
        console.log('   - 3 news posts');
        console.log('   - 3 calendar events');
        console.log('   - 3 downloadable documents');
        process.exit(0);
    } catch (e) {
        console.error('Seed Error:', e);
        process.exit(1);
    }
};

seedStudentPortalData();

import { sequelize, Student, TimetableEntry, Fee } from './models/index.js';

const seedRemainingData = async () => {
    try {
        await sequelize.authenticate();
        console.log('Seeding Remaining Student Portal Data...');

        // 1. Find demo student
        const demoStudent = await Student.findOne({ where: { reg_number: 'STUD001' } });
        if (!demoStudent) {
            console.error('Demo student not found.');
            process.exit(1);
        }

        // 2. Create Timetable for S.1 (Demo student's class)
        const timetableData = [
            // Monday
            { day: 'Monday', subject: 'Mathematics', start_time: '08:00', end_time: '09:00' },
            { day: 'Monday', subject: 'English', start_time: '09:00', end_time: '10:00' },
            { day: 'Monday', subject: 'Physics', start_time: '10:30', end_time: '11:30' },
            // Tuesday
            { day: 'Tuesday', subject: 'Biology', start_time: '08:00', end_time: '09:00' },
            { day: 'Tuesday', subject: 'History', start_time: '09:00', end_time: '10:00' },
            { day: 'Tuesday', subject: 'Mathematics', start_time: '10:30', end_time: '11:30' },
            // Wednesday
            { day: 'Wednesday', subject: 'English', start_time: '08:00', end_time: '09:00' },
            { day: 'Wednesday', subject: 'Physics', start_time: '09:00', end_time: '10:00' },
            { day: 'Wednesday', subject: 'Biology', start_time: '10:30', end_time: '11:30' },
            // Thursday
            { day: 'Thursday', subject: 'History', start_time: '08:00', end_time: '09:00' },
            { day: 'Thursday', subject: 'Mathematics', start_time: '09:00', end_time: '10:00' },
            { day: 'Thursday', subject: 'English', start_time: '10:30', end_time: '11:30' },
            // Friday
            { day: 'Friday', subject: 'Physics', start_time: '08:00', end_time: '09:00' },
            { day: 'Friday', subject: 'Biology', start_time: '09:00', end_time: '10:00' },
            { day: 'Friday', subject: 'History', start_time: '10:30', end_time: '11:30' }
        ];

        for (const entry of timetableData) {
            await TimetableEntry.findOrCreate({
                where: {
                    type: 'class',
                    class_level: 'S.1',
                    day: entry.day,
                    subject: entry.subject,
                    start_time: entry.start_time
                },
                defaults: {
                    type: 'class',
                    class_level: 'S.1',
                    stream: demoStudent.stream,
                    day: entry.day,
                    subject: entry.subject,
                    start_time: entry.start_time,
                    end_time: entry.end_time
                }
            });
        }
        console.log('✅ Timetable entries created (15 periods for S.1)');

        // 3. Create Fee Payment Records
        const feeData = [
            {
                student_id: demoStudent.id,
                amount: 500000,
                type: 'Tuition Fee',
                date: new Date('2024-01-15'),
                term: 'Term 1',
                year: 2024
            },
            {
                student_id: demoStudent.id,
                amount: 200000,
                type: 'Boarding Fee',
                date: new Date('2024-02-10'),
                term: 'Term 1',
                year: 2024
            },
            {
                student_id: demoStudent.id,
                amount: 150000,
                type: 'Activity Fee',
                date: new Date('2024-03-05'),
                term: 'Term 1',
                year: 2024
            }
        ];

        for (const fee of feeData) {
            await Fee.findOrCreate({
                where: {
                    student_id: fee.student_id,
                    type: fee.type,
                    date: fee.date
                },
                defaults: fee
            });
        }
        console.log('✅ Fee payment records created (3 transactions)');

        console.log('\n🎉 All Remaining Data Seeded Successfully!');
        console.log('   - 15 timetable periods for S.1');
        console.log('   - 3 fee payment transactions');
        process.exit(0);
    } catch (e) {
        console.error('Seed Error:', e);
        process.exit(1);
    }
};

seedRemainingData();

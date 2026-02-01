import { sequelize, TimetableEntry } from './server/models/index.js';

// Subject pools for different levels
const oLevelSubjects = [
    'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
    'History', 'Geography', 'Christian Religious Education', 'Islamic Religious Education',
    'Fine Art', 'Music', 'Physical Education', 'Computer Studies', 'Agriculture'
];

const aLevelSubjects = {
    sciences: ['Pure Mathematics', 'Applied Mathematics', 'Physics', 'Chemistry', 'Biology', 'ICT', 'General Paper'],
    arts: ['Literature in English', 'History', 'Geography', 'Economics', 'Divinity', 'Fine Art', 'General Paper'],
    commercial: ['Economics', 'Entrepreneurship', 'Accounting', 'Commerce', 'General Paper']
};

const vocationalSkills = [
    'Tailoring & Fashion Design',
    'Carpentry & Joinery',
    'Electrical Installation',
    'Plumbing',
    'Catering & Hotel Management',
    'Computer Maintenance'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = [
    { start: '08:00', end: '09:00' },
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '10:30', break: true }, // Short Break
    { start: '10:30', end: '11:30' },
    { start: '11:30', end: '12:30' },
    { start: '12:30', end: '14:00', break: true }, // Lunch Break
    { start: '14:00', end: '15:00' },
    { start: '15:00', end: '16:00' }
];

function getRandomSubject(classLevel) {
    if (classLevel === 'S.5' || classLevel === 'S.6') {
        // A-Level: Mix of sciences and arts
        const allALevel = [...aLevelSubjects.sciences, ...aLevelSubjects.arts.slice(0, 3)];
        return allALevel[Math.floor(Math.random() * allALevel.length)];
    } else {
        // O-Level
        return oLevelSubjects[Math.floor(Math.random() * oLevelSubjects.length)];
    }
}

async function seedTimetable() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Clear existing class timetable entries
        await TimetableEntry.destroy({ where: { type: 'class' } });
        console.log('Cleared existing class timetable entries.');

        const entries = [];
        const classes = ['S.1', 'S.2', 'S.3', 'S.4', 'S.5', 'S.6'];

        for (const classLevel of classes) {
            for (const day of days) {
                let periodIndex = 0;

                for (const period of periods) {
                    // Skip breaks
                    if (period.break) continue;

                    // Wednesday afternoon vocational training for lower secondary (S.1-S.3)
                    if (day === 'Wednesday' && period.start >= '14:00' && ['S.1', 'S.2', 'S.3'].includes(classLevel)) {
                        const vocSkill = vocationalSkills[Math.floor(Math.random() * vocationalSkills.length)];
                        entries.push({
                            type: 'class',
                            subject: vocSkill,
                            class_level: classLevel,
                            day: day,
                            start_time: period.start,
                            end_time: period.end,
                            display_order: periodIndex++
                        });
                    } else {
                        // Regular academic subjects
                        entries.push({
                            type: 'class',
                            subject: getRandomSubject(classLevel),
                            class_level: classLevel,
                            day: day,
                            start_time: period.start,
                            end_time: period.end,
                            display_order: periodIndex++
                        });
                    }
                }
            }
        }

        console.log(`Creating ${entries.length} timetable entries...`);
        await TimetableEntry.bulkCreate(entries);
        console.log('✅ Timetable seeded successfully!');
        console.log(`   - ${classes.length} classes (S.1 to S.6)`);
        console.log(`   - ${days.length} days (Monday to Friday)`);
        console.log(`   - Vocational training on Wednesday afternoons for S.1-S.3`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding timetable:', error);
        process.exit(1);
    }
}

seedTimetable();

import bcrypt from 'bcryptjs';
import { sequelize, User, Student, Subject, Mark } from './models/index.js';
import unebGrading from './utils/unebGrading.js';

const seedUNEBData = async () => {
    try {
        console.log('Seeding UNEB Grading System Test Data...');
        await sequelize.authenticate();

        const hash = await bcrypt.hash('uneb123', 10);

        // 1. Create test students with PLE aggregates
        const students = [
            { username: 'uneb_student1', name: 'Alice Nambi', ple: 8, class: 'S.4' },
            { username: 'uneb_student2', name: 'Moses Okello', ple: 15, class: 'S.4' },
            { username: 'uneb_student3', name: 'Grace Achieng', ple: 22, class: 'S.4' }
        ];

        const createdStudents = [];
        for (const s of students) {
            const [user] = await User.findOrCreate({
                where: { username: s.username },
                defaults: { password_hash: hash, role: 'student' }
            });

            const [student] = await Student.findOrCreate({
                where: { userId: user.id },
                defaults: {
                    full_name: s.name,
                    reg_number: `UCE${2024}${s.username.slice(-1)}`,
                    class_level: s.class,
                    stream: 'North',
                    ple_aggregate: s.ple,
                    curriculum_type: 'competency_based',
                    parent_name: `Parent of ${s.name}`,
                    parent_phone: '0700000000'
                }
            });
            createdStudents.push(student);
        }
        console.log(`✅ Created ${students.length} UNEB test students`);

        // 2. Create subjects
        const subjects = [
            { code: 'MTC', name: 'Mathematics', category: 'O-Level' },
            { code: 'ENG', name: 'English', category: 'O-Level' },
            { code: 'PHY', name: 'Physics', category: 'O-Level' },
            { code: 'CHE', name: 'Chemistry', category: 'O-Level' },
            { code: 'BIO', name: 'Biology', category: 'O-Level' }
        ];

        const createdSubjects = [];
        for (const sub of subjects) {
            const [subject] = await Subject.findOrCreate({
                where: { code: sub.code },
                defaults: { ...sub, is_core: true }
            });
            createdSubjects.push(subject);
        }
        console.log(`✅ Created ${subjects.length} subjects`);

        // 3. Create NEW SYSTEM marks (Competency-Based)
        const newSystemMarks = [
            // Alice Nambi (High achiever)
            { student: 0, subject: 0, ca: 85, pw: 90, eot: 88 }, // Math
            { student: 0, subject: 1, ca: 80, pw: 85, eot: 82 }, // English
            { student: 0, subject: 2, ca: 88, pw: 92, eot: 86 }, // Physics
            { student: 0, subject: 3, ca: 82, pw: 88, eot: 84 }, // Chemistry
            { student: 0, subject: 4, ca: 78, pw: 82, eot: 80 }, // Biology

            // Moses Okello (Moderate achiever)
            { student: 1, subject: 0, ca: 65, pw: 70, eot: 68 },
            { student: 1, subject: 1, ca: 70, pw: 72, eot: 72 },
            { student: 1, subject: 2, ca: 60, pw: 65, eot: 62 },
            { student: 1, subject: 3, ca: 68, pw: 70, eot: 70 },
            { student: 1, subject: 4, ca: 72, pw: 75, eot: 74 },

            //Grace Achieng (Lower achiever showing improvement)
            { student: 2, subject: 0, ca: 55, pw: 60, eot: 58 },
            { student: 2, subject: 1, ca: 60, pw: 65, eot: 62 },
            { student: 2, subject: 2, ca: 50, pw: 55, eot: 52 },
            { student: 2, subject: 3, ca: 58, pw: 62, eot: 60 },
            { student: 2, subject: 4, ca: 65, pw: 68, eot: 66 }
        ];

        for (const m of newSystemMarks) {
            const student = createdStudents[m.student];
            const subject = createdSubjects[m.subject];

            // Calculate using UNEB formula
            const finalScore = unebGrading.calculateNewSystemScore(m.ca, m.eot);
            const letterGrade = unebGrading.getLetterGrade(finalScore);

            await Mark.create({
                student_id: student.id,
                subject_id: subject.id,
                term: 'Term 3',
                year: 2024,
                grading_system: 'new_system',
                continuous_assessment: m.ca,
                project_work: m.pw,
                end_of_cycle_exam: m.eot,
                final_score: finalScore,
                letter_grade: letterGrade
            });
        }
        console.log(`✅ Created ${newSystemMarks.length} NEW SYSTEM marks`);

        // 4. Create OLD SYSTEM marks for comparison
        const [oldUser] = await User.findOrCreate({
            where: { username: 'old_student' },
            defaults: { password_hash: hash, role: 'student' }
        });

        const [oldStudent] = await Student.findOrCreate({
            where: { userId: oldUser.id },
            defaults: {
                full_name: 'John Mukasa',
                reg_number: 'UCE2020001',
                class_level: 'S.4',
                stream: 'South',
                ple_aggregate: 12,
                curriculum_type: 'content_based',
                parent_name: 'Parent Mukasa',
                parent_phone: '0700000001'
            }
        });

        const oldSystemScores = [85, 78, 92, 88, 75]; // Math, Eng, Phy, Che, Bio

        for (let i = 0; i < oldSystemScores.length; i++) {
            const score = oldSystemScores[i];
            const numericalGrade = unebGrading.getNumericalGrade(score);

            await Mark.create({
                student_id: oldStudent.id,
                subject_id: createdSubjects[i].id,
                term: 'Term 3',
                year: 2020,
                grading_system: 'old_system',
                score: score,
                final_score: score,
                numerical_grade: numericalGrade
            });
        }
        console.log('✅ Created OLD SYSTEM marks for comparison');

        // Summary
        console.log('\n🎉 UNEB Test Data Seeded Successfully!');
        console.log('\n📊 Test Accounts:');
        console.log('   NEW SYSTEM:');
        console.log('   - uneb_student1 (Alice) - High achiever, PLE 8');
        console.log('   - uneb_student2 (Moses) - Moderate, PLE 15');
        console.log('   - uneb_student3 (Grace) - Improving, PLE 22');
        console.log('   OLD SYSTEM:');
        console.log('   - old_student (John) - Legacy grades');
        console.log('\nPassword for all: uneb123\n');

        process.exit(0);
    } catch (e) {
        console.error('Seed Error:', e);
        process.exit(1);
    }
};

seedUNEBData();

import bcrypt from 'bcryptjs';
import { sequelize, User, Student, Staff, Class, StaffAllocation } from './models/index.js';

const seedFullSchool = async () => {
    try {
        console.log('Starting School Simulation Seed...');
        await sequelize.authenticate();
        await sequelize.sync(); // Changed from { alter: true } to avoid SQLite backup errors

        const hash = await bcrypt.hash('password123', 10);

        // 1. Create Classes
        const classes = ['S.1', 'S.2', 'S.3', 'S.4', 'S.5', 'S.6'];
        for (const c of classes) {
            await Class.findOrCreate({ where: { name: `Senior ${c.split('.')[1]}`, code: c } });
        }
        console.log('Classes Verified.');

        // 2. Create 5 Teachers
        const teachers = [
            { name: 'John Doe', role: 'Mathematics Teacher', sub: 'Mathematics', code: 'MTC' },
            { name: 'Sarah Smith', role: 'English Teacher', sub: 'English', code: 'ENG' },
            { name: 'Robert Brown', role: 'Physics Teacher', sub: 'Physics', code: 'PHY' },
            { name: 'Emily Davis', role: 'Biology Teacher', sub: 'Biology', code: 'BIO' },
            { name: 'Michael Wilson', role: 'History Teacher', sub: 'History', code: 'HIS' }
        ];

        for (let i = 0; i < teachers.length; i++) {
            const t = teachers[i];
            const username = `teacher${i + 1}`;

            // Create User
            const [user] = await User.findOrCreate({
                where: { username },
                defaults: { password_hash: hash, role: 'staff' }
            });

            // Create Staff Profile
            const [staff] = await Staff.findOrCreate({
                where: { userId: user.id },
                defaults: {
                    full_name: t.name,
                    role: t.role,
                    email: `${username}@school.com`,
                    phone_number: `070000000${i}`
                }
            });

            // Allocate Classes (Assign S.1 and S.2 to each for demo) if not already allocated
            await StaffAllocation.findOrCreate({ where: { staff_id: staff.id, class_level: 'S.1', subject_code: t.code }, defaults: { subject_name: t.sub } });
            await StaffAllocation.findOrCreate({ where: { staff_id: staff.id, class_level: 'S.2', subject_code: t.code }, defaults: { subject_name: t.sub } });
            if (i < 2) {
                // First two senior teachers get S.3 too
                await StaffAllocation.create({ staff_id: staff.id, class_level: 'S.3', subject_code: t.code, subject_name: t.sub });
            }
        }
        console.log('5 Teachers Created & Allocated.');

        // 3. Create Default Student Account (Generic Login)
        const studentHash = await bcrypt.hash('stud123', 10);

        const [defaultUser] = await User.findOrCreate({
            where: { username: 'stud' },
            defaults: { password_hash: studentHash, role: 'student' }
        });

        await Student.findOrCreate({
            where: { userId: defaultUser.id },
            defaults: {
                full_name: 'Demo Student',
                reg_number: 'U001000',
                class_level: 'S.1',
                stream: 'North',
                parent_name: 'Demo Parent',
                parent_phone: '0700000000'
            }
        });
        console.log('Default Student Account Created (username: stud, password: stud123)');

        // 4. Create 20 Individual Students
        const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
        const lastNames = ['Kato', 'NamukWAYA', 'Ochieng', 'Akello', 'Mukasa', 'Nalubega', 'Opio', 'Tumusiime', 'Ssentongo', 'Nantume', 'Mugisha', 'Kobusingye', 'Lwanga', 'Nakato', 'Mayanja', 'Nabirye', 'Okello', 'NansUBuga', 'Sserwadda', 'Mbaziira'];

        for (let i = 0; i < 20; i++) {
            const username = `student${i + 1}`;
            const cls = classes[i % 6]; // Distribute across S1-S6

            const [user] = await User.findOrCreate({
                where: { username },
                defaults: { password_hash: studentHash, role: 'student' } // Changed to studentHash
            });

            await Student.findOrCreate({
                where: { userId: user.id },
                defaults: {
                    full_name: `${firstNames[i]} ${lastNames[i]}`,
                    reg_number: `U00${1000 + i}`,
                    class_level: cls,
                    stream: i % 2 === 0 ? 'North' : 'South',
                    parent_name: 'Parent ' + lastNames[i],
                    parent_phone: '0777123456'
                }
            });
        }
        console.log('20 Individual Students Created (all with password: stud123)');

        console.log('Simulation Setup Complete!');
        process.exit(0);
    } catch (e) {
        console.error('Seed Error:', e);
        process.exit(1);
    }
};

seedFullSchool();

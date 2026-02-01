import bcrypt from 'bcryptjs';
import { sequelize, User, Staff, StaffAllocation } from './models/index.js';

const seedVocational = async () => {
    try {
        console.log('Seeding Vocational Staff...');
        await sequelize.authenticate();
        await sequelize.sync(); // Create if not exists, avoid alter table issues

        const hash = await bcrypt.hash('password123', 10);

        const instructors = [
            { name: 'Grace Tailor', role: 'Tailoring Instructor', sub: 'Tailoring & Design', code: 'VOC-TL' },
            { name: 'David Builder', role: 'Construction Instructor', sub: 'Building & Construction', code: 'VOC-BC' },
            { name: 'Sarah Style', role: 'Hairdressing Instructor', sub: 'Hairdressing & Beauty', code: 'VOC-HB' }
        ];

        for (let i = 0; i < instructors.length; i++) {
            const inst = instructors[i];
            const username = `vocational${i + 1}`;

            // Create User
            const [user] = await User.findOrCreate({
                where: { username },
                defaults: { password_hash: hash, role: 'staff' }
            });

            // Create Staff Profile
            const [staff] = await Staff.findOrCreate({
                where: { userId: user.id },
                defaults: {
                    full_name: inst.name,
                    role: inst.role,
                    email: `${username}@school.com`,
                    phone_number: `0700VOC${i}`
                }
            });

            // Assign to 'Vocational' Class
            await StaffAllocation.destroy({ where: { staff_id: staff.id } }); // Reset for idempotency
            await StaffAllocation.create({
                staff_id: staff.id,
                class_level: 'Vocational',
                subject_code: inst.code,
                subject_name: inst.sub
            });
            console.log(`Assigned ${inst.name} to ${inst.sub}`);
        }

        console.log('Vocational Staff Seeded.');
        process.exit(0);
    } catch (e) {
        console.error('Seed Error:', e);
        process.exit(1);
    }
};

seedVocational();

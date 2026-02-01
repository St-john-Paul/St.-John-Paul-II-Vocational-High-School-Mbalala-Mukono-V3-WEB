import bcrypt from 'bcryptjs';
import { sequelize, User, Staff, Student } from './models/index.js';

export const seedDefaults = async () => {
    try {
        // Admin Hash
        const adminHash = await bcrypt.hash('admin123', 10);
        // Staff Hash
        const staffHash = await bcrypt.hash('staff123', 10);
        // Student Hash
        const studentHash = await bcrypt.hash('stud123', 10);

        // ==========================================
        // 1. Ensure Admin User
        // ==========================================
        const [adminUser, adminCreated] = await User.findOrCreate({
            where: { username: 'admin' },
            defaults: {
                password_hash: adminHash,
                role: 'admin'
            }
        });

        if (adminCreated) {
            await Staff.create({
                userId: adminUser.id,
                full_name: 'System ADM',
                role: 'Administrator',
                email: 'admin@school.com'
            });
            console.log('✅ Default Admin created (admin / admin123)');
        }

        // ==========================================
        // 2. Ensure Staff User
        // ==========================================
        const [staffUser, staffCreated] = await User.findOrCreate({
            where: { username: 'staff' },
            defaults: {
                password_hash: staffHash,
                role: 'staff'
            }
        });

        if (staffCreated) {
            await Staff.create({
                userId: staffUser.id,
                full_name: 'Default Staff',
                role: 'Teacher',
                email: 'staff@school.com'
            });
            console.log('✅ Default Staff created (staff / staff123)');
        }

        // ==========================================
        // 3. Ensure Demo Student (demo.student)
        // ==========================================
        const [demoUser, demoCreated] = await User.findOrCreate({
            where: { username: 'demo.student' },
            defaults: {
                password_hash: studentHash,
                role: 'student'
            }
        });

        if (demoCreated) {
            await Student.create({
                userId: demoUser.id,
                full_name: 'Default Student',
                reg_number: 'SJPII/DEMO/001',
                class_level: 'S.4',
                stream: 'North',
                parent_name: 'Demo Parent',
                parent_phone: '0700000000'
            });
            console.log('✅ Default Student created (demo.student / stud123)');
        }

        // ==========================================
        // 4. Ensure Simple Student (student) - NEW REQUEST
        // ==========================================
        const [simpleStudentUser, simpleStudentCreated] = await User.findOrCreate({
            where: { username: 'student' },
            defaults: {
                password_hash: studentHash,
                role: 'student'
            }
        });

        if (simpleStudentCreated) {
            await Student.create({
                userId: simpleStudentUser.id,
                full_name: 'Simple Student',
                reg_number: 'SJPII/SIMPLE/002',
                class_level: 'S.3',
                stream: 'South',
                parent_name: 'Simple Parent',
                parent_phone: '0700000001'
            });
            console.log('✅ Simple Student created (student / stud123)');
        }

    } catch (error) {
        console.error('Error seeding default users:', error);
    }
};

// If run directly (node server/seed.js), still perform the seed but without force sync (unless explicit, but keeping it safe here)
import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    (async () => {
        await sequelize.authenticate();
        await seedDefaults();
        console.log('Seeding process finished.');
        process.exit(0);
    })();
}

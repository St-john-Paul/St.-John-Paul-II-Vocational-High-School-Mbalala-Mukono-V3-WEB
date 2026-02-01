import bcrypt from 'bcryptjs';
import { sequelize, User, Student } from './models/index.js';

const createDefaultStudent = async () => {
    try {
        await sequelize.authenticate();
        console.log('Creating default student account...');

        const studentHash = await bcrypt.hash('stud123', 10);

        // Create or update the default student user
        const [user, created] = await User.findOrCreate({
            where: { username: 'stud' },
            defaults: { password_hash: studentHash, role: 'student' }
        });

        // If user already exists, update password
        if (!created) {
            await user.update({ password_hash: studentHash });
            console.log('Updated existing student account password');
        }

        // Create or find student profile
        const [student] = await Student.findOrCreate({
            where: { userId: user.id },
            defaults: {
                full_name: 'Demo Student',
                reg_number: 'STUD001',
                class_level: 'S.1',
                stream: 'North',
                parent_name: 'Demo Parent',
                parent_phone: '0700000000'
            }
        });

        console.log('✅ Default student account ready!');
        console.log('   Username: stud');
        console.log('   Password: stud123');
        process.exit(0);
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
};

createDefaultStudent();

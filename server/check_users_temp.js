import { sequelize, User } from './models/index.js';

const checkUsers = async () => {
    try {
        await sequelize.authenticate();
        const users = await User.findAll();
        console.log('Current Users:');
        users.forEach(u => {
            console.log(`- Username: ${u.username}, Role: ${u.role}`);
        });
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUsers();


import { sequelize, StaffAllocation } from '../server/models/index.js';

async function diagnose() {
    try {
        await sequelize.authenticate();
        console.log('Database Connection: OK');

        // Check if table exists
        await StaffAllocation.sync({ alter: true });
        console.log('StaffAllocation Table: Synced');

        // Check count
        const count = await StaffAllocation.count();
        console.log('Allocation Count:', count);

        console.log('Diagnostics Passed');
        process.exit(0);
    } catch (error) {
        console.error('Diagnostics Failed:', error);
        process.exit(1);
    }
}

diagnose();

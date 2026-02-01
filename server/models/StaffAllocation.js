import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const StaffAllocation = sequelize.define('StaffAllocation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    class_level: { type: DataTypes.STRING, allowNull: false }, // e.g. S.1
    subject_code: { type: DataTypes.STRING, allowNull: false }, // e.g. MTC
    subject_name: { type: DataTypes.STRING, allowNull: false }  // e.g. Mathematics
});

export default StaffAllocation;

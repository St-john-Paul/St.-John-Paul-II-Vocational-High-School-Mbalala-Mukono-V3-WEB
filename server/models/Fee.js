import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Fee = sequelize.define('Fee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    type: { type: DataTypes.STRING, defaultValue: 'Tuition' }, // Tuition, Uniform, etc.
    reference: { type: DataTypes.STRING }, // Receipt Number
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export default Fee;

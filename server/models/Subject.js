import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Subject = sequelize.define('Subject', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }, // e.g. Mathematics
    code: { type: DataTypes.STRING, allowNull: false, unique: true }, // e.g. MTC
    is_core: { type: DataTypes.BOOLEAN, defaultValue: true },
    category: { type: DataTypes.STRING, defaultValue: 'O-Level' } // O-Level, A-Level, Vocational
});

export default Subject;

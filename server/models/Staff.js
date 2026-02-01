import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Staff = sequelize.define('Staff', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // user_id will be added by association
    full_name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false }, // e.g. Teacher, Bursar, Admin
    phone_number: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING }
});

export default Staff;

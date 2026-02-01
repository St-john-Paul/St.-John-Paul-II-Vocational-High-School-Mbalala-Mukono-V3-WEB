import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Class = sequelize.define('Class', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }, // e.g. Senior One
    code: { type: DataTypes.STRING, allowNull: false }, // e.g. S.1
    stream: { type: DataTypes.STRING } // e.g. North
});

export default Class;

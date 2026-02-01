import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Document = sequelize.define('Document', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, defaultValue: 'general' }, // forms, policies, calendars, general
    file_url: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    is_visible: { type: DataTypes.BOOLEAN, defaultValue: true }
});

export default Document;

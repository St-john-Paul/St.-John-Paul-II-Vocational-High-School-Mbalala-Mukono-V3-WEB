import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SiteSetting = sequelize.define('SiteSetting', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    setting_key: { type: DataTypes.STRING, allowNull: false, unique: true },
    setting_value: { type: DataTypes.TEXT },
    setting_type: { type: DataTypes.STRING, defaultValue: 'text' } // text, url, file
});

export default SiteSetting;

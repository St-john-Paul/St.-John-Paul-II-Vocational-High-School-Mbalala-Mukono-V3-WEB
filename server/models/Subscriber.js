import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Subscriber = sequelize.define('Subscriber', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    subscribed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export default Subscriber;

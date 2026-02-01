import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CalendarEvent = sequelize.define('CalendarEvent', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    event_date: { type: DataTypes.DATEONLY, allowNull: false },
    event_type: { type: DataTypes.STRING, defaultValue: 'event' }, // holiday, exam, event, meeting
    description: { type: DataTypes.TEXT },
    is_important: { type: DataTypes.BOOLEAN, defaultValue: false }
});

export default CalendarEvent;

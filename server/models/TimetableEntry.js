import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TimetableEntry = sequelize.define('TimetableEntry', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, defaultValue: 'routine' }, // routine, class, vocational
    activity_name: { type: DataTypes.STRING, allowNull: true }, // Used for Routine (e.g. "Breakfast") or defaults to Subject Name
    subject: { type: DataTypes.STRING, allowNull: true }, // For Class Timetable
    class_level: { type: DataTypes.STRING, allowNull: true }, // e.g. "S.1", "S.2"
    stream: { type: DataTypes.STRING, allowNull: true }, // Optional stream
    day: { type: DataTypes.STRING, allowNull: true }, // Monday, Tuesday...
    start_time: { type: DataTypes.STRING, allowNull: false },
    end_time: { type: DataTypes.STRING, allowNull: false },
    applies_to: { type: DataTypes.STRING, defaultValue: 'all' }, // Legacy for Routine
    display_order: { type: DataTypes.INTEGER, defaultValue: 0 }
});

export default TimetableEntry;

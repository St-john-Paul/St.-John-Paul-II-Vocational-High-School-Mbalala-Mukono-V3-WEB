import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Video = sequelize.define('Video', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    video_url: { type: DataTypes.STRING, allowNull: false },
    thumbnail_url: { type: DataTypes.STRING }, // For file uploads, maybe auto-generate or user upload. For YT, fetch thumb.
    category: { type: DataTypes.STRING, defaultValue: 'Events' }, // Events, Academics, Campus, etc.
    description: { type: DataTypes.TEXT },
    display_order: { type: DataTypes.INTEGER, defaultValue: 0 }
});

export default Video;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.ENUM('News', 'Event', 'Announcement'), defaultValue: 'News' },
    content: { type: DataTypes.TEXT, allowNull: false },
    image_url: { type: DataTypes.STRING }, // Path to uploaded image or placeholder
    event_date: { type: DataTypes.DATEONLY }, // Only for Events
    is_published: { type: DataTypes.BOOLEAN, defaultValue: true }
});

export default Post;

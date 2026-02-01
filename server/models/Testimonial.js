import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Testimonial = sequelize.define('Testimonial', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author_name: { type: DataTypes.STRING, allowNull: false },
    author_title: { type: DataTypes.STRING }, // e.g. "Parent", "Alumni 2020"
    author_photo: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 5 },
    is_visible: { type: DataTypes.BOOLEAN, defaultValue: true }
});

export default Testimonial;

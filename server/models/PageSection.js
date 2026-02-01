import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PageSection = sequelize.define('PageSection', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    section_key: { type: DataTypes.STRING, allowNull: false, unique: true }, // e.g., 'home_hero', 'home_about'
    title: { type: DataTypes.STRING },
    subtitle: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    image_url: { type: DataTypes.STRING },
    button_text: { type: DataTypes.STRING },
    button_link: { type: DataTypes.STRING },
    display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_visible: { type: DataTypes.BOOLEAN, defaultValue: true }
});

export default PageSection;

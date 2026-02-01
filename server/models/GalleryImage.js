import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const GalleryImage = sequelize.define('GalleryImage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image_url: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, defaultValue: 'Campus' }, // Campus, Academics, Sports, Events, Computer Lab, Vocational, Transport, Dormitories
    caption: { type: DataTypes.STRING },
    display_order: { type: DataTypes.INTEGER, defaultValue: 0 }
});

export default GalleryImage;

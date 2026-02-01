import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const LeadershipMember = sequelize.define('LeadershipMember', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, defaultValue: 'board' }, // board, management
    photo_url: { type: DataTypes.STRING },
    cv_url: { type: DataTypes.STRING },
    bio: { type: DataTypes.TEXT },
    facebook: { type: DataTypes.STRING },
    twitter: { type: DataTypes.STRING },
    linkedin: { type: DataTypes.STRING },
    whatsapp: { type: DataTypes.STRING },
    display_order: { type: DataTypes.INTEGER, defaultValue: 0 }
});

export default LeadershipMember;

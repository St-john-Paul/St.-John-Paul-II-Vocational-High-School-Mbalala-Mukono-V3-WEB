import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'staff', 'student'), allowNull: false },
    // Derived Foreign Key can be handled by associations, but profile_id is good for explicit linking if needed
    // We will rely on associations in index.js for foreign keys usually
});

export default User;

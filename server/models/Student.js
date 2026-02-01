import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Student = sequelize.define('Student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // user_id will be added by association
    full_name: { type: DataTypes.STRING, allowNull: false },
    reg_number: { type: DataTypes.STRING, unique: true, allowNull: false },
    class_level: { type: DataTypes.STRING, allowNull: false }, // e.g. S.1
    stream: { type: DataTypes.STRING, allowNull: true }, // e.g. North
    parent_name: { type: DataTypes.STRING },
    parent_phone: { type: DataTypes.STRING },
    fee_balance: { type: DataTypes.FLOAT, defaultValue: 0.0 },

    // UNEB System Fields
    ple_aggregate: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 4, max: 36 },
        comment: 'PLE aggregate score for value-added tracking (4=best, 36=lowest)'
    },
    curriculum_type: {
        type: DataTypes.ENUM('content_based', 'competency_based'),
        defaultValue: 'competency_based',
        comment: 'Student curriculum type based on enrollment year'
    }
});

export default Student;

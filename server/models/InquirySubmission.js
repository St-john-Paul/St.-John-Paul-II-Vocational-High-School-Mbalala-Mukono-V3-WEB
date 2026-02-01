import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const InquirySubmission = sequelize.define('InquirySubmission', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_name: { type: DataTypes.STRING, allowNull: false },
    parent_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, allowNull: false },
    preferred_course: { type: DataTypes.STRING },
    other_course: { type: DataTypes.STRING }, // If "Other" is selected
    current_school: { type: DataTypes.STRING },
    message: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: 'new' } // new, contacted, enrolled, rejected
});

export default InquirySubmission;

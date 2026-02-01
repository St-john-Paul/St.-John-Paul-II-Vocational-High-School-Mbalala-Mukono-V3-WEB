import sequelize from '../config/database.js';
import User from './User.js';
import Student from './Student.js';
import Staff from './Staff.js';
import Class from './Class.js';
import Subject from './Subject.js';
import Fee from './Fee.js';
import Mark from './Mark.js';
import Post from './Post.js';
// NEW CMS Models
import LeadershipMember from './LeadershipMember.js';
import GalleryImage from './GalleryImage.js';
import Testimonial from './Testimonial.js';
import Subscriber from './Subscriber.js';
import CalendarEvent from './CalendarEvent.js';
import TimetableEntry from './TimetableEntry.js';
import Document from './Document.js';
import InquirySubmission from './InquirySubmission.js';
import SiteSetting from './SiteSetting.js';
import FAQ from './FAQ.js';
import PageSection from './PageSection.js';
import StaffAllocation from './StaffAllocation.js';
import Video from './Video.js';

// Define Associations
User.hasOne(Student, { foreignKey: 'userId', onDelete: 'CASCADE' });
Student.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Staff, { foreignKey: 'userId', onDelete: 'CASCADE' });
Staff.belongsTo(User, { foreignKey: 'userId' });

Staff.hasMany(StaffAllocation, { foreignKey: 'staff_id' });
StaffAllocation.belongsTo(Staff, { foreignKey: 'staff_id' });

Student.hasMany(Fee, { foreignKey: 'student_id' });
Fee.belongsTo(Student, { foreignKey: 'student_id' });

Student.hasMany(Mark, { foreignKey: 'student_id' });
Mark.belongsTo(Student, { foreignKey: 'student_id' });

Subject.hasMany(Mark, { foreignKey: 'subject_id' });
Mark.belongsTo(Subject, { foreignKey: 'subject_id' });

export {
    sequelize, User, Student, Staff, Class, Subject, Fee, Mark, Post,
    LeadershipMember, GalleryImage, Testimonial, Subscriber,
    CalendarEvent, TimetableEntry, Document, InquirySubmission, SiteSetting, FAQ, PageSection,
    StaffAllocation, Video
};


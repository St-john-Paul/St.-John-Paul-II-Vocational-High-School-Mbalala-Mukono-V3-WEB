import { Sequelize } from 'sequelize';
import path from 'path';

const dbPath = path.resolve('school.db');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false
});

export default sequelize;

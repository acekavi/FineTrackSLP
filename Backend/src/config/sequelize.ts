import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

dotenv.config({ path: './config/.env' });

const sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    host: config.host
});

export default sequelize;

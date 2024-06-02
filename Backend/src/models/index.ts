import { Sequelize, DataTypes } from 'sequelize';
import { readdirSync } from 'fs';
import { join, basename as _basename } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db: any = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach((file) => {
        const model = require(join(__dirname, file)).default(sequelize, DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

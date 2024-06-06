import { Sequelize, DataTypes } from 'sequelize';
import { readdirSync } from 'fs';
import { join, basename as _basename } from 'path';
import sequelize from '../config/sequelize';

const basename = _basename(__filename);

const db: any = {};

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

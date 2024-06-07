import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { ModelRegistry } from '../models';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

const env = process.env.NODE_ENV || 'development';
const config = require(path.resolve(__dirname, '../config/config.json'))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    host: config.host,
});

const models = ModelRegistry(sequelize);

// Setting up associations
Object.values(models).forEach((model) => {
    if (typeof model.associate === 'function') {
        model.associate(models);
    }
});

export default sequelize;
export { models };

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const sequelize = new Sequelize(process.env.POSTGRES_URI!, {
    dialect: 'postgres',
    logging: false,
});

export default sequelize;

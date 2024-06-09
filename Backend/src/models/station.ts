import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from 'sequelize';
import sequelize from '../sequelize';

class Station extends Model<InferAttributes<Station>, InferCreationAttributes<Station>> {
    declare stationId: string;
    declare username: string;
    declare password: string;
    declare location: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initModel(sequelize: Sequelize) {
        Station.init(
            {
                stationId: {
                    type: DataTypes.CHAR(8),
                    primaryKey: true,
                    allowNull: false,
                },
                username: {
                    type: DataTypes.STRING(15),
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING(60),
                    allowNull: false,
                },
                location: {
                    type: DataTypes.STRING(512),
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                tableName: 'Stations',
                timestamps: true,
            }
        );
    }
}
export default Station;

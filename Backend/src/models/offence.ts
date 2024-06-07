import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from 'sequelize';
import sequelize from '../sequelize';

class Offence extends Model<InferAttributes<Offence>, InferCreationAttributes<Offence>> {
    declare offenceId: CreationOptional<number>;
    declare description: string;
    declare score: number;
    declare enabled: boolean;
    declare fee: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initModel(sequelize: Sequelize) {
        Offence.init(
            {
                offenceId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                score: {
                    type: DataTypes.DECIMAL(4, 2),
                    allowNull: false,
                },
                enabled: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                },
                fee: {
                    type: DataTypes.DECIMAL(10, 2),
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
                tableName: 'Offences',
                timestamps: true,
            }
        );
    }
}
export default Offence;

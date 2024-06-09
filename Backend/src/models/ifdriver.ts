import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../sequelize';

class IfDriver extends Model<InferAttributes<IfDriver>, InferCreationAttributes<IfDriver>> {
    declare fineId: number;
    declare vehicle: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initModel(sequelize: any) {
        IfDriver.init(
            {
                fineId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                },
                vehicle: {
                    type: DataTypes.CHAR(10),
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
                tableName: 'IfDrivers',
                timestamps: true,
            }
        );
    }
}

export default IfDriver;

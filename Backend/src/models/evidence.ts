import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from 'sequelize';
import sequelize from '../sequelize';

class Evidence extends Model<InferAttributes<Evidence>, InferCreationAttributes<Evidence>> {
    declare fineId: number;
    declare evidenceLink: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initModel(sequelize: Sequelize) {
        Evidence.init(
            {
                fineId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                },
                evidenceLink: {
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
                tableName: 'Evidences',
                timestamps: true,
            }
        );
    }
}

export default Evidence;

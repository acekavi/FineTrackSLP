import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, Sequelize } from 'sequelize';
import { Citizen } from '.';
import sequelize from '../sequelize';

class Feedback extends Model<InferAttributes<Feedback>, InferCreationAttributes<Feedback>> {
    declare nic: ForeignKey<Citizen['nic']>;
    declare feedback: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initModel(sequelize: Sequelize) {
        Feedback.init(
            {
                nic: {
                    type: DataTypes.CHAR(12),
                    allowNull: false,
                    references: {
                        model: Citizen,
                        key: 'nic',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                feedback: {
                    type: DataTypes.TEXT,
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
                tableName: 'Feedbacks',
                timestamps: true,
            }
        );
    }
}
export default Feedback;

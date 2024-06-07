import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, Sequelize } from 'sequelize';
import { NIC } from '.';
import sequelize from '../sequelize';

class Citizen extends Model<InferAttributes<Citizen>, InferCreationAttributes<Citizen>> {
    declare nicNumber: ForeignKey<NIC['idNumber']>;
    declare mobile: string;
    declare username: string;
    declare password: string;
    declare earnedScore: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initModel(sequelize: Sequelize) {
        Citizen.init(
            {
                nicNumber: {
                    type: DataTypes.CHAR(12),
                    primaryKey: true,
                    allowNull: false,
                    references: {
                        model: NIC,
                        key: 'idNumber',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                mobile: {
                    type: DataTypes.STRING(15),
                    allowNull: false,
                },
                username: {
                    type: DataTypes.STRING(15),
                    unique: true,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING(60),
                    allowNull: false,
                },
                earnedScore: {
                    type: DataTypes.DECIMAL(4, 2),
                    allowNull: true,
                    defaultValue: 0,
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
                tableName: 'Citizens',
                timestamps: true,
            }
        );
    }
}
export default Citizen;

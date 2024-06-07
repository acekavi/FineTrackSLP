import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, Sequelize } from 'sequelize';
import { NIC, Station } from '.';
import sequelize from '../sequelize';

class Officer extends Model<InferAttributes<Officer>, InferCreationAttributes<Officer>> {
    [x: string]: any;
    declare officerId: CreationOptional<number>;
    declare username: string;
    declare nic: ForeignKey<NIC['id_number']>;
    declare stationId: ForeignKey<Station['stationId']>;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initModel(sequelize: Sequelize) {
        Officer.init(
            {
                officerId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                username: {
                    type: DataTypes.STRING(15),
                    unique: true,
                    allowNull: false,
                },
                nic: {
                    type: DataTypes.CHAR(12),
                    allowNull: false,
                    references: {
                        model: NIC,
                        key: 'id_number',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                stationId: {
                    type: DataTypes.CHAR(8),
                    allowNull: false,
                    references: {
                        model: Station,
                        key: 'stationId',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                password: {
                    type: DataTypes.STRING(60),
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
                tableName: 'Officers',
                timestamps: true,
            }
        );
    }
}

export default Officer;

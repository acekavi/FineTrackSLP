import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, Sequelize } from 'sequelize';
import { NIC } from '.';
import sequelize from '../sequelize';

class DrLicence extends Model<InferAttributes<DrLicence>, InferCreationAttributes<DrLicence>> {
    declare licenceNumber: string;
    declare expiryDate: Date;
    declare nicNumber: ForeignKey<NIC['idNumber']>;
    declare spectaclesNeeded: boolean;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initModel(sequelize: Sequelize) {
        DrLicence.init(
            {
                licenceNumber: {
                    type: DataTypes.STRING(8),
                    primaryKey: true,
                    allowNull: false,
                },
                expiryDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                nicNumber: {
                    type: DataTypes.CHAR(12),
                    allowNull: false,
                    references: {
                        model: NIC,
                        key: 'idNumber',
                    },
                    unique: true,
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                spectaclesNeeded: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
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
                tableName: 'DrLicences',
                timestamps: true,
            }
        );
    }
}

export default DrLicence;

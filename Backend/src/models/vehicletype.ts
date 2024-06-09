import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, Sequelize } from 'sequelize';
import { DrLicence } from '.';
import sequelize from '../sequelize';

class VehicleType extends Model<InferAttributes<VehicleType>, InferCreationAttributes<VehicleType>> {
    declare licenceNumber: ForeignKey<DrLicence['licenceNumber']>;
    declare types: string[];
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initModel(sequelize: Sequelize) {
        VehicleType.init(
            {
                licenceNumber: {
                    type: DataTypes.STRING(8),
                    primaryKey: true,
                    allowNull: false,
                    references: {
                        model: DrLicence,
                        key: 'licenceNumber',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                types: {
                    type: DataTypes.ARRAY(
                        DataTypes.ENUM(
                            'A1', 'A', 'B1', 'B', 'C1', 'C', 'CE', 'D1', 'D', 'DE', 'G1', 'G', 'J'
                        )
                    ),
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
                tableName: 'VehicleTypes',
                timestamps: true,
            }
        );
    }
}
export default VehicleType;

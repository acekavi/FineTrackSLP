import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from 'sequelize';
import sequelize from '../sequelize';

class NIC extends Model<InferAttributes<NIC>, InferCreationAttributes<NIC>> {
    declare id_number: string;
    declare firstName: string;
    declare middleName: string;
    declare surname: string;
    declare dob: Date;
    declare gender: 'Male' | 'Female' | 'Other';
    declare address1: string;
    declare address2: string;
    declare address3: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initModel(sequelize: Sequelize) {
        NIC.init(
            {
                id_number: {
                    type: DataTypes.CHAR(12),
                    primaryKey: true,
                    allowNull: false,
                },
                firstName: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                middleName: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                surname: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                dob: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                gender: {
                    type: DataTypes.ENUM('Male', 'Female', 'Other'),
                    allowNull: false,
                },
                address1: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
                address2: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
                address3: {
                    type: DataTypes.STRING(100),
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
                tableName: 'NICs',
                timestamps: true,
            }
        );
    }
}
export default NIC;

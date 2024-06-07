import { Model, DataTypes, Sequelize } from 'sequelize';
import { AssociatableModel } from '../global-types';

class VehicleType extends Model implements AssociatableModel {
    public vehicle_ID!: number;
    public type_name!: string;

    public static associate?: (models: any) => void;
}

export default (sequelize: Sequelize) => {
    VehicleType.init({
        vehicle_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        type_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'VehicleType',
    });

    return VehicleType;
};

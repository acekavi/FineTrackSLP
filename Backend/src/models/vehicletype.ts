import { Model, DataTypes, Sequelize } from 'sequelize';

interface VehicleTypeAttributes {
    vehicle_number: string;
    vehicle_type: string;
}

export class VehicleType extends Model<VehicleTypeAttributes> implements VehicleTypeAttributes {
    public vehicle_number!: string;
    public vehicle_type!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {

    }
}

export default (sequelize: Sequelize) => {
    VehicleType.init({
        vehicle_number: {
            type: DataTypes.STRING(8),
            allowNull: false,
            primaryKey: true,
        },
        vehicle_type: {
            type: DataTypes.CHAR(2),
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'VehicleType',
        timestamps: true,
    });

    return VehicleType;
};

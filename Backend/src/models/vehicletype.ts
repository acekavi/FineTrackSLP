import { Model, DataTypes, Sequelize } from 'sequelize';

interface VehicleTypeAttributes {
    Licence_no: string;
    A1: boolean;
    A: boolean;
    B1: boolean;
    B: boolean;
    C1: boolean;
    C: boolean;
    CE: boolean;
    D1: boolean;
    D: boolean;
    DE: boolean;
    G1: boolean;
    G: boolean;
    J: boolean;
}

export class VehicleType extends Model<VehicleTypeAttributes> implements VehicleTypeAttributes {
    public Licence_no!: string;
    public A1!: boolean;
    public A!: boolean;
    public B1!: boolean;
    public B!: boolean;
    public C1!: boolean;
    public C!: boolean;
    public CE!: boolean;
    public D1!: boolean;
    public D!: boolean;
    public DE!: boolean;
    public G1!: boolean;
    public G!: boolean;
    public J!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        VehicleType.belongsTo(models.DrLicence, {
            foreignKey: 'Licence_no',
            as: 'drLicence',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    }

}

export default (sequelize: Sequelize) => {
    VehicleType.init({
        Licence_no: {
            type: DataTypes.STRING(8),
            allowNull: false,
            primaryKey: true,
        },
        A1: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        A: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        B1: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        B: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        C1: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        C: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        CE: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        D1: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        D: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        DE: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        G1: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        G: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        J: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'VehicleType',
        timestamps: true,
    });

    return VehicleType;
};

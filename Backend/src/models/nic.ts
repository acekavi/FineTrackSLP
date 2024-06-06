import { Model, DataTypes, Sequelize } from 'sequelize';

interface NicAttributes {
    NIC: string;
    firstname: string;
    middlename: string;
    surname: string;
    DOB: Date;
    gender: string;
    add_1: string;
    add_2: string;
    add_3: string;
}

class Nic extends Model<NicAttributes> implements NicAttributes {
    public NIC!: string;
    public firstname!: string;
    public middlename!: string;
    public surname!: string;
    public DOB!: Date;
    public gender!: string;
    public add_1!: string;
    public add_2!: string;
    public add_3!: string;

    static associate(models: any) {
        Nic.hasOne(models.Citizen, {
            foreignKey: 'NIC',
            as: 'citizen',
        });
    }
}

export default (sequelize: Sequelize) => {
    Nic.init({
        NIC: {
            type: DataTypes.CHAR(12),
            allowNull: false,
            primaryKey: true,
        },
        firstname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        middlename: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        add_1: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        add_2: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        add_3: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

    }, {
        sequelize,
        modelName: 'Nic',
        timestamps: true,
    });

    return Nic;
};

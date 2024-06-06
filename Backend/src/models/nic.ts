import { Model, DataTypes, Sequelize } from 'sequelize';

interface NicAttributes {
    ID: string;
    firstname: string;
    middlename?: string;
    surname: string;
    gender: string;
    DOB: Date;
    add1: string;
    add2: string;
    add3: string;
}

export class Nic extends Model<NicAttributes> implements NicAttributes {
    public ID!: string;
    public firstname!: string;
    public middlename?: string;
    public surname!: string;
    public gender!: string;
    public DOB!: Date;
    public add1!: string;
    public add2!: string;
    public add3!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
    Nic.init({
        ID: {
            type: DataTypes.STRING(12),
            allowNull: false,
            primaryKey: true,
        },
        firstname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        middlename: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        surname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        add1: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        add2: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        add3: {
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

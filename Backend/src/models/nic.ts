import { Model, DataTypes, Sequelize } from 'sequelize';
import { AssociatableModel } from '../global-types';

export class NIC extends Model implements AssociatableModel {
    public id_number!: string;
    public firstname!: string;
    public middlename!: string;
    public surname!: string;
    public DOB!: Date;
    public gender!: string;
    public add_1!: string;
    public add_2!: string;
    public add_3!: string;

    public static associate?: (models: any) => void;
}

export default (sequelize: Sequelize) => {
    NIC.init({
        id_number: {
            type: DataTypes.CHAR(12),
            primaryKey: true,
            allowNull: false,
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
        modelName: 'NIC',
    });

    return NIC;
};

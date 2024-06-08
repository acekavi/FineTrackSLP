import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, Sequelize } from 'sequelize';
import { Citizen, Offence, Officer } from '.';
import sequelize from '../sequelize';

class FineRecord extends Model<InferAttributes<FineRecord>, InferCreationAttributes<FineRecord>> {
    declare fineId: CreationOptional<number>;
    declare nicNumber: ForeignKey<Citizen['nicNumber']>;
    declare totalFine: number;
    declare totalScore: number;
    declare fineDate: Date;
    declare fineTime: string;
    declare locationName: string | null;
    declare locationLink: string;
    declare isDriver: boolean;
    declare officerId: ForeignKey<Officer['officerId']>;
    declare isPaid: boolean | null;
    declare payReferenceId: string | null;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    public addOffences!: (offences: Offence[]) => Promise<void>;

    static initModel(sequelize: Sequelize) {
        FineRecord.init(
            {
                fineId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                nicNumber: {
                    type: DataTypes.CHAR(12),
                    allowNull: false,
                    references: {
                        model: Citizen,
                        key: 'nicNumber',
                    },
                },
                totalFine: {
                    type: DataTypes.DECIMAL(12, 2),
                    allowNull: false,
                },
                totalScore: {
                    type: DataTypes.DECIMAL(4, 2),
                    allowNull: false,
                },
                fineDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                fineTime: {
                    type: DataTypes.TIME,
                    allowNull: false,
                },
                locationName: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                locationLink: {
                    type: DataTypes.STRING(512),
                    allowNull: false,
                },
                isDriver: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                officerId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Officer,
                        key: 'officerId',
                    },
                },
                isPaid: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                payReferenceId: {
                    type: DataTypes.TEXT,
                    allowNull: true,
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
                tableName: 'FineRecords',
                timestamps: true,
            }
        );
    }
}
export default FineRecord;

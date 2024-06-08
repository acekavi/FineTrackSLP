import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, Sequelize } from 'sequelize';
import { FineRecord, Offence } from '.';
import sequelize from '../sequelize';

class OffenceRecord extends Model<InferAttributes<OffenceRecord>, InferCreationAttributes<OffenceRecord>> {
    declare fineId: ForeignKey<FineRecord['fineId']>;
    declare offenceId: ForeignKey<Offence['offenceId']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initModel(sequelize: Sequelize) {
        OffenceRecord.init(
            {
                fineId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    references: {
                        model: FineRecord,
                        key: 'fineId',
                    },
                },
                offenceId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Offence,
                        key: 'offenceId',
                    },
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
                tableName: 'OffenceRecords',
                timestamps: true,
            }
        );
    }
}
export default OffenceRecord;

import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, Sequelize } from 'sequelize';
import { FineRecord, Offence } from '.';
import sequelize from '../sequelize';

/**
 * One offence on one fine.
 *
 * `feeAtIssue` and `scoreAtIssue` are copied in when the fine is written, not
 * joined at read time. An invoice records what was charged; joining to the
 * current fee would make every historical report change the next time a
 * penalty is revised, and a fine is a legal document that must still say what
 * it said on the day it was issued.
 *
 * The joined-at-the-time value in OffenceFees remains the audit trail — these
 * two should agree, and a disagreement is worth alerting on.
 */
class OffenceRecord extends Model<InferAttributes<OffenceRecord>, InferCreationAttributes<OffenceRecord>> {
    declare fineId: ForeignKey<FineRecord['fineId']>;
    declare offenceId: ForeignKey<Offence['offenceId']>;
    declare feeAtIssue: number;
    declare scoreAtIssue: number;
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
                    primaryKey: true,
                    allowNull: false,
                    references: {
                        model: Offence,
                        key: 'offenceId',
                    },
                },
                feeAtIssue: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                scoreAtIssue: {
                    type: DataTypes.DECIMAL(4, 2),
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
                tableName: 'OffenceRecords',
                timestamps: true,
            }
        );
    }
}
export default OffenceRecord;

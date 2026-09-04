import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    Sequelize,
} from 'sequelize';
import Offence from './offence';

/**
 * What an offence cost over a given period.
 *
 * The fee used to live on the Offence row, which meant raising a penalty was
 * an UPDATE that silently changed what every fine already issued was worth.
 * Here a fee change is an INSERT: the old row is closed off and a new one
 * opens, so the history stays readable.
 *
 * `validFrom` is inclusive and `validTo` exclusive. A Postgres exclusion
 * constraint (see the migration) stops two rows for one offence overlapping —
 * that guarantee belongs in the database, because an application-level check
 * loses to two concurrent writers.
 */
class OffenceFee extends Model<InferAttributes<OffenceFee>, InferCreationAttributes<OffenceFee>> {
    declare offenceFeeId: CreationOptional<number>;
    declare offenceId: ForeignKey<Offence['offenceId']>;
    declare fee: number;
    declare score: number;
    /** The gazette or circular the change came from. */
    declare source: CreationOptional<string | null>;
    declare validFrom: string;
    declare validTo: CreationOptional<string | null>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initModel(sequelize: Sequelize) {
        OffenceFee.init(
            {
                offenceFeeId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                fee: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                score: {
                    type: DataTypes.DECIMAL(4, 2),
                    allowNull: false,
                },
                source: {
                    type: DataTypes.STRING(120),
                    allowNull: true,
                },
                validFrom: {
                    type: DataTypes.DATEONLY,
                    allowNull: false,
                },
                validTo: {
                    type: DataTypes.DATEONLY,
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
                tableName: 'OffenceFees',
                timestamps: true,
            }
        );
    }
}

export default OffenceFee;

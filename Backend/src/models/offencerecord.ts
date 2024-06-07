import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import { Offence } from './offence';
import { AssociatableModel } from '../global-types';
import { FineRecord } from './finerecord';

export class OffenceRecord extends Model implements AssociatableModel {
  public fine_ID!: number;
  public offence_ID!: number;
  public offence_date!: Date;

  public static associations: {
    fineDetails: Association<OffenceRecord, FineRecord>;
    offenceDetails: Association<OffenceRecord, Offence>;
  };

  public static associate(models: any) {
    OffenceRecord.belongsTo(models.FineRecord, {
      foreignKey: 'fine_ID',
      as: 'fineDetails',
    });

    OffenceRecord.belongsTo(models.Offence, {
      foreignKey: 'offence_ID',
      as: 'offenceDetails',
    });
  }
}

export default (sequelize: Sequelize) => {
  OffenceRecord.init({
    fine_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FineRecord',
        key: 'fine_ID',
      }
    },
    offence_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Offences',
        key: 'offence_ID',
      },
    },
    offence_date: {
      type: DataTypes.DATE,
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
    modelName: 'OffenceRecord',
  });

  return OffenceRecord;
};

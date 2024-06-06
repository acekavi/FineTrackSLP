import { Model, DataTypes, Sequelize } from 'sequelize';

interface OffenceRecordAttributes {
  fine_ID: number;
  offence_ID: number;
  offence_date: Date;
}

class OffenceRecord extends Model<OffenceRecordAttributes> implements OffenceRecordAttributes {
  public fine_ID!: number;
  public offence_ID!: number;
  public offence_date!: Date;

  static associate(models: any) {
    OffenceRecord.belongsTo(models.FineRecord, {
      foreignKey: 'fine_ID',
      as: 'fineRecord',
    });
    OffenceRecord.belongsTo(models.Offence, {
      foreignKey: 'offence_ID',
      as: 'offence',
    });
  }
}

export default (sequelize: Sequelize) => {
  OffenceRecord.init({
    fine_ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    offence_ID: {
      type: DataTypes.INTEGER.UNSIGNED,
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
  }, {
    sequelize,
    modelName: 'OffenceRecord',
    timestamps: true,
  });

  return OffenceRecord;
};

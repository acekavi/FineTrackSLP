import { Model, DataTypes, Sequelize } from 'sequelize';

interface OffenceRecordAttributes {
  fine_ID: number;
  offence_ID: number;
}

class OffenceRecord extends Model<OffenceRecordAttributes> implements OffenceRecordAttributes {
  public fine_ID!: number;
  public offence_ID!: number;

  static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  OffenceRecord.init({
    fine_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    offence_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'OffenceRecord',
  });

  return OffenceRecord;
};

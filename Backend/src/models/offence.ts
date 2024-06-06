import { Model, DataTypes, Sequelize } from 'sequelize';

interface OffenceAttributes {
  offence_ID: number;
  offence_description: string;
  score: number;
  enable_stat: boolean;
  fee: number;
}

class Offence extends Model<OffenceAttributes> implements OffenceAttributes {
  public offence_ID!: number;
  public offence_description!: string;
  public score!: number;
  public enable_stat!: boolean;
  public fee!: number;

  static associate(models: any) {
    Offence.hasMany(models.OffenceRecord, {
      foreignKey: 'offence_ID',
      as: 'offenceRecords',
    });
  }
}

export default (sequelize: Sequelize) => {
  Offence.init({
    offence_ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    offence_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    enable_stat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Offence',
    timestamps: true,
  });

  return Offence;
};

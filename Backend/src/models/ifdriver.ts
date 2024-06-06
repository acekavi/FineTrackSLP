import { Model, DataTypes, Sequelize } from 'sequelize';

interface IfDriverAttributes {
  fine_ID: number;
  vehicle: string;
}

class IfDriver extends Model<IfDriverAttributes> implements IfDriverAttributes {
  public fine_ID!: number;
  public vehicle!: string;

  static associate(models: any) {
    IfDriver.belongsTo(models.FineRecord, {
      foreignKey: 'fine_ID',
      as: 'fineRecord',
    });
  }
}

export default (sequelize: Sequelize) => {
  IfDriver.init({
    fine_ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    vehicle: {
      type: DataTypes.CHAR(10),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'IfDriver',
    timestamps: true,
  });

  return IfDriver;
};
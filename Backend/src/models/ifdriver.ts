import { Model, DataTypes, Sequelize } from 'sequelize';

interface IfDriverAttributes {
  fine_ID: number;
  vehicle: string;
}

class IfDriver extends Model<IfDriverAttributes> implements IfDriverAttributes {
  public fine_ID!: number;
  public vehicle!: string;

  static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  IfDriver.init({
    fine_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    vehicle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'IfDriver',
  });

  return IfDriver;
};

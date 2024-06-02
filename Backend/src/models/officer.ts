import { Model, DataTypes, Sequelize } from 'sequelize';

interface OfficerAttributes {
  officer_ID: number;
  username: string;
  password: string;
  station_ID: string;
}

class Officer extends Model<OfficerAttributes> implements OfficerAttributes {
  public officer_ID!: number;
  public username!: string;
  public password!: string;
  public station_ID!: string;

  static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Officer.init({
    officer_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    station_ID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Officer',
  });

  return Officer;
};

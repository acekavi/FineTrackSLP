import { Model, DataTypes, Sequelize } from 'sequelize';

interface StationAttributes {
  station_ID: string;
  password: string;
}

class Station extends Model<StationAttributes> implements StationAttributes {
  public station_ID!: string;
  public password!: string;

  static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Station.init({
    station_ID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Station',
  });

  return Station;
};

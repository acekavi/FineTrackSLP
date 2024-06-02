import { Model, DataTypes, Sequelize } from 'sequelize';
import Officer from './officer';

interface StationAttributes {
  station_ID: string;
  username: string;
  password: string;
}

class Station extends Model<StationAttributes> implements StationAttributes {
  public station_ID!: string;
  public username!: string;
  public password!: string;

  static associate(models: any) {
    Station.hasMany(models.Officer, {
      foreignKey: 'station_ID',
      as: 'officers',
    });
  }
}

export default (sequelize: Sequelize) => {
  Station.init({
    station_ID: {
      type: DataTypes.STRING,
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
  }, {
    sequelize,
    modelName: 'Station',
  });

  return Station;
};

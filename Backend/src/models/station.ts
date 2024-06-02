import { Model, DataTypes, Sequelize } from 'sequelize';

interface StationAttributes {
  station_ID: string;
  username: string;
  station_name: string;
  station_location: string;
}

class Station extends Model<StationAttributes> implements StationAttributes {
  public station_ID!: string;
  public username!: string;
  public station_name!: string;
  public station_location!: string;

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
      unique: true,
      allowNull: false,
    },
    station_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    station_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Station',
    timestamps: true,
  });

  return Station;
};

import { Model, DataTypes, Sequelize } from 'sequelize';

interface StationAttributes {
  station_ID: string;
  username: string;
  password: string;
  location: string;
}

class Station extends Model<StationAttributes> implements StationAttributes {
  public station_ID!: string;
  public username!: string;
  public password!: string;
  public location!: string;

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
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Station',
    timestamps: true,
  });

  return Station;
};

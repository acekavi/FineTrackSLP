import { Model, DataTypes, Sequelize } from 'sequelize';
import Station from './station';
import FineRecord from './finerecord';

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
    Officer.hasMany(models.FineRecord, {
      foreignKey: 'officer_ID',
      as: 'fineRecords',
    });

    Officer.belongsTo(models.Station, {
      foreignKey: 'station_ID',
      as: 'station',
    });
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
      references: {
        model: 'Stations', // Ensure this is the correct table name
        key: 'station_ID',
      },
    },
  }, {
    sequelize,
    modelName: 'Officer',
  });

  return Officer;
};

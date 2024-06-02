import { Model, DataTypes, Sequelize } from 'sequelize';

interface OfficerAttributes {
  officer_ID: number;
  username: string;
  station_ID: string;
  password: string;
}

class Officer extends Model<OfficerAttributes> implements OfficerAttributes {
  public officer_ID!: number;
  public username!: string;
  public station_ID!: string;
  public password!: string;

  static associate(models: any) {
    Officer.belongsTo(models.Station, {
      foreignKey: 'station_ID',
      as: 'station',
    });
    Officer.hasMany(models.FineRecord, {
      foreignKey: 'officer_ID',
      as: 'fineRecords',
    });
  }
}

export default (sequelize: Sequelize) => {
  Officer.init({
    officer_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    station_ID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Stations',
        key: 'station_ID',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Officer',
    timestamps: true,
  });

  return Officer;
};



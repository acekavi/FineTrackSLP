import { Model, DataTypes, Sequelize } from 'sequelize';

interface OfficerAttributes {
  officer_ID: number;
  username: string;
  NIC: string;
  station_ID: string;
  password: string;
}

class Officer extends Model<OfficerAttributes> implements OfficerAttributes {
  public officer_ID!: number;
  public username!: string;
  public NIC!: string;
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
    Officer.belongsTo(models.Nic, {
      foreignKey: 'NIC',
      as: 'nic',
    });
  }
}

export default (sequelize: Sequelize) => {
  Officer.init({
    officer_ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false,
    },
    NIC: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      references: {
        model: 'Nics',
        key: 'NIC',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    station_ID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'Stations',
        key: 'station_ID',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Officer',
    timestamps: true,
  });

  return Officer;
};

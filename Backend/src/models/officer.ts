import { Model, DataTypes, Sequelize } from 'sequelize';

interface OfficerAttributes {
  officer_ID: number;
  username: string;
  station_ID: string;
  officer_name: string;
  officer_email: string;
  officer_contact: string;
  officer_password: string;
  officer_user_type: string;
}

class Officer extends Model<OfficerAttributes> implements OfficerAttributes {
  public officer_ID!: number;
  public username!: string;
  public station_ID!: string;
  public officer_name!: string;
  public officer_email!: string;
  public officer_contact!: string;
  public officer_password!: string;
  public officer_user_type!: string;

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
    officer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officer_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officer_contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officer_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officer_user_type: {
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



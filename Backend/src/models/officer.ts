import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import { NIC } from './nic';
import { Station } from './station';
import { AssociatableModel } from '../global-types';

export class Officer extends Model implements AssociatableModel {
  public officer_ID!: number;
  public username!: string;
  public nic!: string;
  public station_ID!: string;
  public password!: string;

  public static associations: {
    citizenDetails: Association<Officer, NIC>
    officerDetails: Association<Officer, Station>
  };

  public static associate(models: any) {
    Officer.belongsTo(models.NIC, {
      foreignKey: 'nic',
      as: 'officerNicDetails',
    });
    Officer.belongsTo(models.Station, {
      foreignKey: 'station_ID',
      as: 'stationDetails',
    });
  }
}

export default (sequelize: Sequelize) => {
  Officer.init({
    officer_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false,
    },
    nic: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      references: {
        model: 'NIC',
        key: 'id_number',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    station_ID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'Station',
        key: 'station_ID',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    sequelize,
    modelName: 'Officer',
  })

  return Officer;
}

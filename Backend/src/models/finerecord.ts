import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import { Citizen } from './citizen';
import { Officer } from './officer';
import { AssociatableModel } from '../global-types';

export class FineRecord extends Model implements AssociatableModel {
  public fine_ID!: number;
  public nic!: string;
  public total_fine!: number;
  public total_score!: number;
  public fine_date!: Date;
  public fine_time!: Date;
  public location_name?: string;
  public location_link!: string;
  public isDriver!: boolean;
  public officer_ID!: number;
  public is_payed?: boolean;
  public pay_reference_id?: string;

  public static associations: {
    citizenDetails: Association<FineRecord, Citizen>
    officerDetails: Association<FineRecord, Officer>
  };

  public static associate = (models: any) => {
    FineRecord.belongsTo(models.Citizen, {
      foreignKey: 'nic',
      as: 'citizenDetails',
    });
    FineRecord.belongsTo(models.Officer, {
      foreignKey: 'officer_ID',
      as: 'officerDetails',
    });
  };
}

export default (sequelize: Sequelize) => {
  FineRecord.init({
    fine_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nic: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      references: {
        model: 'Citizen',
        key: 'nic',
      },
    },
    total_fine: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    total_score: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    fine_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fine_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location_link: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    isDriver: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    officer_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Officer',
        key: 'officer_ID',
      },
    },
    is_payed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    pay_reference_id: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    modelName: 'FineRecord',
  });
  return FineRecord;
};

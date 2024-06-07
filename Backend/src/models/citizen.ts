import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import { NIC } from './nic';
import { AssociatableModel } from '../global-types';

export class Citizen extends Model implements AssociatableModel {
  public nic!: string;
  public mobile!: number;
  public username!: string;
  public password!: string;
  public earned_score?: number;

  public static associations: {
    nicDetails: Association<Citizen, NIC>
  };

  public static associate = (models: any) => {
    Citizen.belongsTo(models.NIC, {
      foreignKey: 'nic',
      as: 'citizenNicDetails',
    });
  };
}

export default (sequelize: Sequelize) => {
  Citizen.init({
    nic: {
      type: DataTypes.CHAR(12),
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'NIC',
        key: 'id_number',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    mobile: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    earned_score: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
      defaultValue: 0,
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
    modelName: 'Citizen',
  });
  return Citizen;
};

import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import { NIC } from './nic';
import { AssociatableModel } from '../global-types';

export class DrLicence extends Model implements AssociatableModel {
  public licence_number!: string;
  public expire_date!: Date;
  public nic!: string;
  public spects_needed!: boolean;

  public static associations: {
    nicDetails: Association<DrLicence, NIC>
  };

  public static associate = (models: any) => {
    DrLicence.belongsTo(models.NIC, {
      foreignKey: 'nic',
      as: 'violaterNicDetails',
    });
  };
}

export default (sequelize: Sequelize) => {
  DrLicence.init({
    licence_number: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      allowNull: false,
    },
    expire_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nic: {
      type: DataTypes.STRING(12),
      allowNull: false,
      references: {
        model: 'NIC',
        key: 'id_number',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    spects_needed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    modelName: 'DrLicence',
  });

  return DrLicence;
};

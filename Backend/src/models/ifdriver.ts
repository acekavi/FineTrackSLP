import { Model, DataTypes, Sequelize } from 'sequelize';
import { AssociatableModel } from '../global-types';

export class IfDriver extends Model implements AssociatableModel {
  public fine_ID!: number;
  public vehicle!: string;

  public static associate?: (models: any) => void;
}

export default (sequelize: Sequelize) => {
  IfDriver.init({
    fine_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    vehicle: {
      type: DataTypes.CHAR(10),
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
    modelName: 'IfDriver',
  });

  return IfDriver;
};

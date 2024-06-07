import { Model, DataTypes, Sequelize } from 'sequelize';
import { AssociatableModel } from '../global-types';

export class Station extends Model implements AssociatableModel {
  public station_ID!: string;
  public username!: string;
  public password!: string;
  public location!: string;

  public static associate?: (models: any) => void;
}

export default (sequelize: Sequelize) => {
  Station.init({
    station_ID: {
      type: DataTypes.CHAR(8),
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(15),
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
    modelName: 'Station',
  });

  return Station;
};

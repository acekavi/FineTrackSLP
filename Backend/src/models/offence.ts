import { Model, DataTypes, Sequelize } from 'sequelize';
import { AssociatableModel } from '../global-types';

export class Offence extends Model implements AssociatableModel {
  public offence_ID!: number;
  public offence_description!: string;
  public score!: number;
  public enable_stat!: boolean;
  public fee!: number;

  public static associate?: (models: any) => void;
}

export default (sequelize: Sequelize) => {
  Offence.init({
    offence_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    offence_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    enable_stat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fee: {
      type: DataTypes.DECIMAL(10, 2),
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
    modelName: 'Offence',
  });

  return Offence;
};

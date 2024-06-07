import { Model, DataTypes, Sequelize } from 'sequelize';
import { AssociatableModel } from '../global-types';

export class Evidence extends Model implements AssociatableModel {
  public fine_id!: number;
  public evi_link!: string;

  public static associate?: (models: any) => void;
}

export default (sequelize: Sequelize) => {
  Evidence.init({
    fine_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    evi_link: {
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
    modelName: 'Evidence',
  });

  return Evidence;
};

import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import { Citizen } from './citizen';
import { AssociatableModel } from '../global-types';

export class Feedback extends Model implements AssociatableModel {
  public nic!: string;
  public feedback!: string;

  public static associations: {
    citizenFeedback: Association<Feedback, Citizen>
  };

  public static associate = (models: any) => {
    Feedback.belongsTo(models.Citizen, {
      foreignKey: 'nic',
      as: 'citizenFeedback',
    });
  };
}

export default (sequelize: Sequelize) => {
  Feedback.init({
    nic: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      references: {
        model: 'Citizen',
        key: 'nic',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    feedback: {
      type: DataTypes.TEXT,
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
    modelName: 'Feedback',
  });

  return Feedback;
};

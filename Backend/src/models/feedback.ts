import { Model, DataTypes, Sequelize } from 'sequelize';

interface FeedbackAttributes {
  nic: string;
  feedback: string;
}

class Feedback extends Model<FeedbackAttributes> implements FeedbackAttributes {
  public nic!: string;
  public feedback!: string;

  static associate(models: any) {
    Feedback.belongsTo(models.Citizen, {
      foreignKey: 'nic',
      as: 'citizen',
    });
  }
}

export default (sequelize: Sequelize) => {
  Feedback.init({
    nic: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      references: {
        model: 'Citizens',
        key: 'nic',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Feedback',
  });

  return Feedback;
};

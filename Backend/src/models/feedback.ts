import { Model, DataTypes, Sequelize } from 'sequelize';

interface FeedbackAttributes {
  NIC: string;
  feedback: string;
}

class Feedback extends Model<FeedbackAttributes> implements FeedbackAttributes {
  public NIC!: string;
  public feedback!: string;

  static associate(models: any) {
    Feedback.belongsTo(models.Citizen, {
      foreignKey: 'NIC',
      as: 'citizen',
    });
  }
}

export default (sequelize: Sequelize) => {
  Feedback.init({
    NIC: {
      type: DataTypes.CHAR(12),
      allowNull: false,
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

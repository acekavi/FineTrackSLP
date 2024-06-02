import { Model, DataTypes, Sequelize } from 'sequelize';

interface FeedbackAttributes {
  ID: string;
  feedback: string;
}

class Feedback extends Model<FeedbackAttributes> implements FeedbackAttributes {
  public ID!: string;
  public feedback!: string;

  static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Feedback.init({
    ID: {
      type: DataTypes.STRING,
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

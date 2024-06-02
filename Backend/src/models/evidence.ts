import { Model, DataTypes, Sequelize } from 'sequelize';

// Define an interface for the model attributes
interface EvidenceAttributes {
  fine_ID: number;
  evi_link: string;
}

// Extend the Sequelize Model class with the interface
class Evidence extends Model<EvidenceAttributes> implements EvidenceAttributes {
  public fine_ID!: number;
  public evi_link!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  static associate(models: any) {
    // Define association here
  }
}

// Initialize the model
export default (sequelize: Sequelize) => {
  Evidence.init({
    fine_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    evi_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Evidence',
    timestamps: true,
  });

  return Evidence;
};

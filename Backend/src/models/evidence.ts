import { Model, DataTypes, Sequelize } from 'sequelize';

interface EvidenceAttributes {
  fine_ID: number;
  evi_link: string;
}

class Evidence extends Model<EvidenceAttributes> implements EvidenceAttributes {
  public fine_ID!: number;
  public evi_link!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Evidence.belongsTo(models.FineRecord, {
      foreignKey: 'fine_ID',
      as: 'fineRecord',
    });
  }
}

export default (sequelize: Sequelize) => {
  Evidence.init({
    fine_ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    evi_link: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Evidence',
    timestamps: true,
  });

  return Evidence;
};
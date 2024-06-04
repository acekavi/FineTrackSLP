import { Model, DataTypes, Sequelize } from 'sequelize';

interface CitizenAttributes {
  NIC: string;
  mobile: number;
  username: string;
  password: string;
  earned_score?: number;
}

export class Citizen extends Model<CitizenAttributes> implements CitizenAttributes {
  public NIC!: string;
  public mobile!: number;
  public username!: string;
  public password!: string;
  public earned_score?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Citizen.hasMany(models.FineRecord, {
      foreignKey: 'NIC',
      as: 'fineRecords',
    });
    Citizen.hasMany(models.Feedback, {
      foreignKey: 'NIC',
      as: 'feedbacks',
    });
  }
}

export default (sequelize: Sequelize) => {
  Citizen.init({
    NIC: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    mobile: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    earned_score: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Citizen',
    timestamps: true,
  });

  return Citizen;
};

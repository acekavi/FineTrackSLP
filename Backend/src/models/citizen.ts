import { Model, DataTypes, Sequelize } from 'sequelize';

interface CitizenAttributes {
  nic: string;
  mobile: number;
  username: string;
  password: string;
  earned_score?: number;
}

class Citizen extends Model<CitizenAttributes> implements CitizenAttributes {
  public nic!: string;
  public mobile!: number;
  public username!: string;
  public password!: string;
  public earned_score?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Citizen.hasMany(models.FineRecord, {
      foreignKey: 'nic',
      as: 'fineRecords',
    });
    Citizen.hasMany(models.Feedback, {
      foreignKey: 'nic',
      as: 'feedbacks',
    });
    Citizen.hasOne(models.Nic, {
      foreignKey: 'id_number',
      as: 'NIC',
    });
  }
}

export default (sequelize: Sequelize) => {
  Citizen.init({
    nic: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Nics',
        key: 'id_number',
      },
      onUpdate: 'CASCADE',
    },
    mobile: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    earned_score: {
      type: DataTypes.DECIMAL(4, 2),
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

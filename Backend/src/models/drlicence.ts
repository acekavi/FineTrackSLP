import { Model, DataTypes, Sequelize } from 'sequelize';

interface DrLicenceAttributes {
  licence_number: string;
  expire_date: Date;
  nic: string;
  spects_needed: string;
}

export class DrLicence extends Model<DrLicenceAttributes> implements DrLicenceAttributes {
  public licence_number!: string;
  public expire_date!: Date;
  public nic!: string;
  public spects_needed!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    DrLicence.belongsTo(models.Nic, {
      foreignKey: 'nic',
      as: 'nic_card',
    });
  }
}

export default (sequelize: Sequelize) => {
  DrLicence.init({
    licence_number: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true,
    },
    expire_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nic: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
      references: {
        model: 'Nics',
        key: 'id_number',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    spects_needed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'DrLicence',
    timestamps: true,
  });

  return DrLicence;
};
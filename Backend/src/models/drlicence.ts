import { Model, DataTypes, Sequelize } from 'sequelize';

interface DrLicenceAttributes {
  Licence_no: string;
  Expire_date: Date;
  NIC: string;
}

export class DrLicence extends Model<DrLicenceAttributes> implements DrLicenceAttributes {
  public Licence_no!: string;
  public Expire_date!: Date;
  public NIC!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    DrLicence.belongsTo(models.Citizen, {
      foreignKey: 'NIC',
      as: 'citizen',
    });

    DrLicence.hasOne(models.VehicleType, {
      foreignKey: 'Licence_no',
      as: 'vehicleType',
    });
  }
}

export default (sequelize: Sequelize) => {
  DrLicence.init({
    Licence_no: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true,
    },
    Expire_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    NIC: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'DrLicence',
    timestamps: true,
  });

  return DrLicence;
};
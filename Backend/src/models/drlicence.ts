import { Model, DataTypes, Sequelize } from 'sequelize';

interface DrLicenceAttributes {
  Licence_no: string;
  Expire_date: Date;
  ID: string;
}

export class DrLicence extends Model<DrLicenceAttributes> implements DrLicenceAttributes {
  public Licence_no!: string;
  public Expire_date!: Date;
  public ID!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
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
    ID: {
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

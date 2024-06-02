import { Model, DataTypes, Sequelize } from 'sequelize';

interface FineRecordAttributes {
  fine_ID: number;
  NIC: string;
  total_fine: number;
  total_score: number;
  fine_date: Date;
  fine_time: string;
  location_name: string | null;
  location_link: string;
  isDriver: boolean;
  officer_ID: number;
  is_payed: boolean | null;
  pay_reference_id: string | null;
}

class FineRecord extends Model<FineRecordAttributes> implements FineRecordAttributes {
  public fine_ID!: number;
  public NIC!: string;
  public total_fine!: number;
  public total_score!: number;
  public fine_date!: Date;
  public fine_time!: string;
  public location_name!: string | null;
  public location_link!: string;
  public isDriver!: boolean;
  public officer_ID!: number;
  public is_payed!: boolean | null;
  public pay_reference_id!: string | null;

  static associate(models: any) {
    FineRecord.belongsTo(models.Citizen, {
      foreignKey: 'NIC',
      as: 'citizen',
    });
    FineRecord.belongsTo(models.Officer, {
      foreignKey: 'officer_ID',
      as: 'officer',
    });
    FineRecord.hasMany(models.Evidence, {
      foreignKey: 'fine_ID',
      as: 'evidences',
    });
    FineRecord.hasMany(models.IfDriver, {
      foreignKey: 'fine_ID',
      as: 'ifDrivers',
    });
    FineRecord.hasMany(models.OffenceRecord, {
      foreignKey: 'fine_ID',
      as: 'offenceRecords',
    });
  }
}

export default (sequelize: Sequelize) => {
  FineRecord.init({
    fine_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    NIC: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Citizens',
        key: 'NIC',
      },
    },
    total_fine: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    total_score: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    fine_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fine_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDriver: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    officer_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Officers',
        key: 'officer_ID',
      },
    },
    is_payed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    pay_reference_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'FineRecord',
    timestamps: true,
  });

  return FineRecord;
};

import NIC from './nic';
import Evidence from './evidence';
import Feedback from './feedback';
import Offence from './offence';
import Station from './station';
import Officer from './officer';
import FineRecord from './finerecord';
import OffenceRecord from './offencerecord';
import VehicleType from './vehicletype';
import IfDriver from './ifdriver';
import sequelize from '../sequelize';
import DrLicence from './drlicence';
import Citizen from './citizen';

// Initialize models
NIC.initModel(sequelize);
DrLicence.initModel(sequelize);
Citizen.initModel(sequelize);
Evidence.initModel(sequelize);
Feedback.initModel(sequelize);
IfDriver.initModel(sequelize);
Offence.initModel(sequelize);
Station.initModel(sequelize);
Officer.initModel(sequelize);
FineRecord.initModel(sequelize);
OffenceRecord.initModel(sequelize);
VehicleType.initModel(sequelize);

// Define associations
DrLicence.belongsTo(NIC, { foreignKey: 'nicNumber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
NIC.hasOne(DrLicence, { foreignKey: 'nicNumber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Citizen.belongsTo(NIC, { foreignKey: 'nicNumber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
NIC.hasOne(Citizen, { foreignKey: 'nicNumber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Feedback.belongsTo(Citizen, { foreignKey: 'nicNumber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Citizen.hasMany(Feedback, { foreignKey: 'nicNumber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

FineRecord.belongsTo(Citizen, { foreignKey: 'nicNumber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Citizen.hasMany(FineRecord, { foreignKey: 'nicNumber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

FineRecord.belongsTo(Officer, { foreignKey: 'officerId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Officer.hasMany(FineRecord, { foreignKey: 'officerId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

OffenceRecord.belongsTo(FineRecord, { foreignKey: 'fineId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
FineRecord.hasMany(OffenceRecord, { foreignKey: 'fineId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

OffenceRecord.belongsTo(Offence, { foreignKey: 'offenceId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Offence.hasMany(OffenceRecord, { foreignKey: 'offenceId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

FineRecord.belongsToMany(Offence, { through: OffenceRecord, foreignKey: 'fineId' });
Offence.belongsToMany(FineRecord, { through: OffenceRecord, foreignKey: 'offenceId' });

Officer.belongsTo(NIC, { foreignKey: 'nicNumber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
NIC.hasMany(Officer, { foreignKey: 'nicNumber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Officer.belongsTo(Station, { foreignKey: 'stationId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Station.hasMany(Officer, { foreignKey: 'stationId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

VehicleType.belongsTo(DrLicence, { foreignKey: 'licenceNumber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
DrLicence.hasOne(VehicleType, { foreignKey: 'licenceNumber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export {
  NIC,
  DrLicence,
  Citizen,
  Evidence,
  Feedback,
  IfDriver,
  Offence,
  Station,
  Officer,
  FineRecord,
  OffenceRecord,
  VehicleType,
};

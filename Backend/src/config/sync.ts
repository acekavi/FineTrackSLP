import OfficerModel from '../models/officer';
import StationModel from '../models/station';
import CitizenModel from '../models/citizen';
import EvidenceModel from '../models/evidence';
import FeedbackModel from '../models/feedback';
import FineRecordModel from '../models/finerecord';
import IfDriverModel from '../models/ifdriver';
import OffenceModel from '../models/offence';
import OffenceRecordModel from '../models/offencerecord';
import NicModel from '../models/nic';
import DrLicenceModel from '../models/drlicence';
import VehicleTypeModel from '../models/vehicletype';

import sequelize from './sequelize';

const Nic = NicModel(sequelize);
const DrLicence = DrLicenceModel(sequelize);
const Officer = OfficerModel(sequelize);
const Station = StationModel(sequelize);
const Evidence = EvidenceModel(sequelize);
const Feedback = FeedbackModel(sequelize);
const IfDriver = IfDriverModel(sequelize);
const Offence = OffenceModel(sequelize);
const OffenceRecord = OffenceRecordModel(sequelize);
const FineRecord = FineRecordModel(sequelize);
const Citizen = CitizenModel(sequelize);
const VehicelType = VehicleTypeModel(sequelize);

// Call associate method for each model with associations
Nic.associate({ Citizen, Officer });
DrLicence.associate({ Nic });
Station.associate({ Officer });
Officer.associate({ FineRecord, Station, Nic });
IfDriver.associate({ FineRecord });
Evidence.associate({ FineRecord });
Feedback.associate({ Citizen });
Offence.associate({ OffenceRecord });
OffenceRecord.associate({ FineRecord, Offence });
FineRecord.associate({ Citizen, Officer, Evidence, IfDriver, OffenceRecord });
Citizen.associate({ FineRecord, Feedback, Nic });

// Sync models in the order of dependencies
sequelize.sync({ force: false })
    .then(() => {
        console.log('Successfully synced database tables with models.');
    })
    .catch((err) => {
        console.error('Error creating database tables:', err);
    }).finally(() => {
        sequelize.close();
    })

export { sequelize, Officer, Station, FineRecord, Citizen, Evidence, Feedback, IfDriver, Offence, OffenceRecord };
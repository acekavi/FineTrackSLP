import OfficerModel from '../models/officer';
import StationModel from '../models/station';
import CitizenModel from '../models/citizen';
import EvidenceModel from '../models/evidence';
import FeedbackModel from '../models/feedback';
import FineRecordModel from '../models/finerecord';
import IfDriverModel from '../models/ifdriver';
import OffenceModel from '../models/offence';
import OffenceRecordModel from '../models/offencerecord';

import sequelize from './sequelize';

const Officer = OfficerModel(sequelize);
const Station = StationModel(sequelize);
const FineRecord = FineRecordModel(sequelize);
const Citizen = CitizenModel(sequelize);
const Evidence = EvidenceModel(sequelize);
const Feedback = FeedbackModel(sequelize);
const IfDriver = IfDriverModel(sequelize);
const Offence = OffenceModel(sequelize);
const OffenceRecord = OffenceRecordModel(sequelize);

// Call associate method for each model with associations
Officer.associate({ FineRecord, Station });
Station.associate({ Officer });
FineRecord.associate({ Citizen, Officer, Evidence, IfDriver, OffenceRecord });
Citizen.associate({ FineRecord, Feedback });
Evidence.associate({ FineRecord });
Feedback.associate({ Citizen });
IfDriver.associate({ FineRecord });
Offence.associate({ OffenceRecord });
OffenceRecord.associate({ FineRecord, Offence });

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

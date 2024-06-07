import { Sequelize } from 'sequelize';
import DrLicence from './drlicence';
import Citizen from './citizen';
import Evidence from './evidence';
import Feedback from './feedback';
import FineRecord from './finerecord';
import IfDriver from './ifdriver';
import NIC from './nic';
import Offence from './offence';
import OffenceRecord from './offencerecord';
import Officer from './officer';
import Station from './station';
import VehicleType from './vehicletype';

export const ModelRegistry = (sequelize: Sequelize) => {
    const models = {
        DrLicence: DrLicence(sequelize),
        Citizen: Citizen(sequelize),
        Evidence: Evidence(sequelize),
        Feedback: Feedback(sequelize),
        FineRecord: FineRecord(sequelize),
        IfDriver: IfDriver(sequelize),
        NIC: NIC(sequelize),
        Offence: Offence(sequelize),
        OffenceRecord: OffenceRecord(sequelize),
        Officer: Officer(sequelize),
        Station: Station(sequelize),
        VehicleType: VehicleType(sequelize),
    };

    return models;
};

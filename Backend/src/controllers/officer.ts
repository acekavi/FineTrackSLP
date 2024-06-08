import { Request, Response } from 'express';
import { RequestWithUser } from '../global-types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { Citizen, DrLicence, FineRecord, NIC, Offence, OffenceRecord, Officer } from '../models';

export const create_user = async (req: Request, res: Response) => {
    try {
        const { officer_ID, username, nic, password, station_ID } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newOfficer = await Officer.create({
            officerId: officer_ID,
            nicNumber: nic,
            username: username.toLowerCase(),
            stationId: station_ID.toLowerCase(),
            password: hashedPassword,
        });

        return res.status(201).json({
            message: 'Officer created successfully',
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to create officer',
        });
    }
};

export const signin_user = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const officer = await Officer.findOne({ where: { username } });

        if (!officer) {
            return res.status(404).json({
                message: 'Officer not found',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, officer.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password',
            });
        }

        const token = jwt.sign({ username: officer.username, role: "officer" }, "finetrack2024", { expiresIn: '8h' });

        return res.status(200).json({
            message: 'Signin successful',
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to log in officer',
        });
    }
};

export const get_user = async (req: RequestWithUser, res: Response) => {
    try {
        const username = req.user?.username;

        const officer = await Officer.findOne({
            where: { username },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [{
                model: NIC,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }]
        });

        if (!officer) {
            return res.status(404).json({
                message: 'Officer not found',
            });
        }

        return res.status(200).json(officer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get officer',
        });
    }
};

export const check_drivers_licence = async (req: RequestWithUser, res: Response) => {
    try {
        const { nicNumber, licenceNumber } = req.body;

        if (!nicNumber && !licenceNumber) {
            return res.status(400).json({ message: 'Both NIC and Licence number cannot be empty!' });
        }

        let violater = null;

        if (licenceNumber) {
            const driversLicence = await DrLicence.findOne({
                where: { licenceNumber },
                attributes: ['nicNumber']
            });

            if (!driversLicence) {
                return res.status(404).json({ message: 'Invalid licence number!' });
            }

            violater = await NIC.findOne({
                where: { idNumber: driversLicence.nicNumber },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
        }

        if (!violater && nicNumber) {
            violater = await NIC.findOne({
                where: { idNumber: nicNumber },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            if (!violater) {
                return res.status(404).json({ message: 'Invalid NIC number!' });
            }
        }

        return res.status(200).json(violater);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed to get violator' });
    }
};

export const check_nic_passport = async (req: RequestWithUser, res: Response) => {
    try {
        const nicNumber = req.body.nicNumber;
        const passport_number = req.body.passport_number;

        if (!nicNumber && !passport_number) {
            return res.status(400).json({
                message: 'Both NIC and Passport cannot be empty!',
            });
        }

        const violater = await NIC.findOne({
            where: {
                [Op.or]: [
                    { idNumber: nicNumber },
                    { idNumber: passport_number }
                ]
            },
            include: {
                model: Citizen,
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
            },
        });

        if (!violater) {
            return res.status(404).json({
                message: 'Invalid nic or passport number!',
            });
        }

        return res.status(200).json(violater);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get officer',
        });
    }
}

export const get_violater_details = async (req: RequestWithUser, res: Response) => {
    try {
        const { idNumber } = req.body;

        const violater = await NIC.findOne({
            where: { idNumber },
            include: {
                model: Citizen,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });

        if (!violater) {
            return res.status(404).json({
                message: 'Violator not found',
            });
        }

        return res.status(200).json(violater);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get violator details',
        });
    }
}

export const get_violator_fine_records = async (req: RequestWithUser, res: Response) => {
    try {
        const { nicNumber } = req.body;

        // Fetch the violator's NIC details
        const violations = await FineRecord.findAll({
            where: { nicNumber },
            include: [
                {
                    model: Offence,
                    through: {
                        attributes: []
                    },
                    attributes: ['description', 'fee', 'score']
                }
            ]
        });

        if (!violations || violations.length === 0) {
            return res.status(404).json({
                message: 'Violator not found',
            });
        }

        return res.status(200).json(violations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to get violator details',
        });
    }
};

export const add_fine_record = async (req: RequestWithUser, res: Response) => {
    try {
        const { nicNumber, offenceIds, locationName, locationLink, isDriver } = req.body;

        // Ensure the NIC number exists in the Citizens table, or create a new citizen
        let citizen = await Citizen.findOne({ where: { nicNumber } });

        if (!citizen) {
            citizen = await Citizen.create({ nicNumber });
        }

        // Find the offences with the given IDs
        const offences = await Offence.findAll({
            where: { offenceId: { [Op.in]: offenceIds } }
        });

        // Calculate the total fine and score
        let totalFine = 0;
        let totalScore = 0;
        const fineDate = new Date();
        const fineTime = fineDate.toTimeString().split(' ')[0]; // Use HH:MM:SS format

        offences.forEach(offence => {
            totalFine += parseFloat(offence.fee.toString()); // Ensure fee is parsed as a float
            totalScore += parseFloat(offence.score.toString()); // Ensure score is parsed as a float
        });

        const officer = await Officer.findOne({
            where: { username: req.user?.username },
            attributes: ['officerId']
        });

        // Create a new fine record for the citizen with the given NIC number
        const fineRecord = await FineRecord.create({
            nicNumber,
            totalFine: parseFloat(totalFine.toFixed(2)), // Ensure totalFine is stored as a float with 2 decimal places
            totalScore: parseFloat(totalScore.toFixed(2)), // Ensure totalScore is stored as a float with 2 decimal places
            fineDate,
            fineTime,
            locationName,
            locationLink,
            isDriver,
            officerId: officer?.officerId,
            isPaid: false,
        });

        await fineRecord.addOffences(offences);

        // Return the fine record with its offences
        const fineRecordResult = await FineRecord.findByPk(fineRecord.fineId, {
            include: [Offence]
        });

        // Fetch the violator's NIC details
        const violations = await FineRecord.findAll({
            where: { nicNumber },
            include: [
                {
                    model: Offence,
                    through: {
                        attributes: []
                    },
                    attributes: ['description', 'fee', 'score']
                }
            ]
        });

        return res.json(violations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add fine record' });
    }
};
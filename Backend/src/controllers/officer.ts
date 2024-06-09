import { Request, Response } from 'express';
import { RequestWithUser } from '../global-types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { Citizen, DrLicence, FineRecord, NIC, Offence, OffenceRecord, Officer, VehicleType } from '../models';

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

        let citizen = await Citizen.findOne({
            where: { nicNumber: idNumber },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [
                {
                    model: NIC,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ]
        });

        if (!citizen) {
            citizen = await Citizen.create({ nicNumber: idNumber },);
        }

        if (!citizen) {
            return res.status(404).json({
                message: 'Citizen not found',
            });
        }

        const drLicence = await DrLicence.findOne({
            where: { nicNumber: citizen.nicNumber },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: VehicleType,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ]
        });

        let responseObject = citizen.toJSON();

        if (drLicence) {
            responseObject = {
                ...responseObject,
                // @ts-ignore
                DrLicence: drLicence
            };
        }

        return res.status(200).json(responseObject);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get citizen',
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
                message: 'Violations not found',
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
        const { nicNumber, offenceIds, fineDescription, locationName, locationLink, isDriver } = req.body;

        let citizen = await Citizen.findOne({ where: { nicNumber } });

        if (!citizen) {
            citizen = await Citizen.create({ nicNumber });
        }

        const offences = await Offence.findAll({
            where: { offenceId: { [Op.in]: offenceIds } }
        });

        let totalFine = 0;
        let totalScore = 0;
        const fineDate = new Date();
        const fineTime = fineDate.toTimeString().split(' ')[0];

        offences.forEach(offence => {
            totalFine += parseFloat(offence.fee.toString());
            totalScore += parseFloat(offence.score.toString());
        });

        totalScore = Math.min(totalScore, 99);
        const averageScore = totalScore / offences.length;

        const officer = await Officer.findOne({
            where: { username: req.user?.username },
            attributes: ['officerId']
        });

        const fineRecordCount = await FineRecord.count({ where: { nicNumber: citizen.nicNumber } }) ?? 1;

        let newAverageScore = (citizen.earnedScore * fineRecordCount + totalScore) / (fineRecordCount + 1);
        newAverageScore = Math.min(newAverageScore, 99);

        await citizen.update({ earnedScore: newAverageScore });

        const fineRecord = await FineRecord.create({
            nicNumber,
            fineDescription,
            totalFine: parseFloat(totalFine.toFixed(2)),
            totalScore: parseFloat(averageScore.toFixed(2)),
            fineDate,
            fineTime,
            locationName,
            locationLink,
            isDriver,
            officerId: officer?.officerId,
            isPaid: false,
        });

        await fineRecord.addOffences(offences);

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
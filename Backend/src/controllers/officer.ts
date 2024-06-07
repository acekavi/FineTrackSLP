import { Request, Response } from 'express';
import { RequestWithUser } from '../global-types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { DrLicence, FineRecord, NIC, Offence, OffenceRecord, Officer } from '../models';

export const create_user = async (req: Request, res: Response) => {
    try {
        const { officer_ID, username, nic, password, station_ID } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newOfficer = await Officer.create({
            officerId: officer_ID,
            nic,
            username: username.toLowerCase(),
            stationId: station_ID.toLowerCase(),
            password: hashedPassword,
        });

        return res.status(201).json({
            message: 'Officer created successfully',
        });
    } catch (error: any) {
        console.log(error.name);
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
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });

        const userDetails = await NIC.findOne({
            where: { id_number: officer?.nic },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })

        if (!officer) {
            return res.status(404).json({
                message: 'Officer not found',
            });
        }

        const responseJson = {
            username: officer.username,
            role: 'officer',
            NIC: userDetails,
            officer_ID: officer.officerId,
            station_ID: officer.stationId,
        }

        return res.status(200).json(responseJson);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get officer',
        });
    }
};

export const check_drivers_licence = async (req: RequestWithUser, res: Response) => {
    try {
        const licenceNumber = req.body.licence_number;

        const violater = await DrLicence.findOne({
            where: { licenceNumber },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        const userDetails = await NIC.findOne({
            where: { id_number: violater?.nic },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })

        if (!violater) {
            return res.status(404).json({
                message: 'Invalid licence number!',
            });
        }

        const responseJson = {
            licence_number: violater.licenceNumber,
            expire_date: violater.expiryDate,
            NIC: userDetails,
        }

        return res.status(200).json(responseJson);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get officer',
        });
    }
}

export const check_nic_passport = async (req: RequestWithUser, res: Response) => {
    try {
        const nic_number = req.body.nic_number;
        const passport_number = req.body.passport_number;

        if (!nic_number && !passport_number) {
            return res.status(400).json({
                message: 'Both NIC and Passport cannot be empty!',
            });
        }

        const violater = await NIC.findOne({
            where: {
                id_number: {
                    [Op.or]: [nic_number, passport_number]
                }
            },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });

        if (!violater) {
            return res.status(404).json({
                message: 'Invalid nic or passport number!',
            });
        }

        const responseJson = {
            NIC: violater,
        }

        return res.status(200).json(responseJson);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get officer',
        });
    }
}

export const getViolatorDetails = async (req: RequestWithUser, res: Response) => {
    try {
        const nic = req.body.nic_number;

        // Fetch the violator's NIC details
        const violator = await NIC.findOne({
            where: { id_number: nic },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!violator) {
            return res.status(404).json({
                message: 'Violator not found',
            });
        }

        // Fetch the fine records
        const fineRecords = await FineRecord.findAll({
            where: { nic },
            include: [
                {
                    model: OffenceRecord,
                    include: [
                        {
                            model: Offence,
                            attributes: ['description', 'fee', 'score']
                        }
                    ],
                    attributes: ['offenceDate']
                }
            ],
            attributes: [
                'fineId', 'totalFine', 'totalScore', 'fineDate', 'fineTime',
                'locationName', 'locationLink', 'isDriver', 'isPaid', 'payReferenceId'
            ]
        });

        const responseJson = {
            violator,
            fineRecords
        };

        return res.status(200).json(responseJson);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get violator details',
        });
    }
};
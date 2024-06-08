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
        const licenceNumber = req.body.licence_number;

        const driversLicence = await DrLicence.findOne({
            where: { licenceNumber },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!driversLicence) {
            return res.status(404).json({
                message: 'Invalid licence number!',
            });
        }

        const violater = await NIC.findOne({
            where: {
                idNumber: driversLicence?.nicNumber
            },
            include: [
                {
                    model: Citizen
                }
            ],
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        })

        return res.status(200).json(violater);
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
                [Op.or]: [
                    { idNumber: nic_number },
                    { idNumber: passport_number }
                ]
            },
            include: [
                {
                    model: Citizen
                }
            ],
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
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

export const get_violator_fine_records = async (req: RequestWithUser, res: Response) => {
    try {
        const nicNumber = req.body.nic_number;

        // Fetch the violator's NIC details
        const violations = await FineRecord.findAll({
            where: { nicNumber },
            include: [
                {
                    model: OffenceRecord,
                    include: [
                        {
                            model: Offence,
                            attributes: ['description', 'fee', 'score']
                        }
                    ]
                }
            ]
        });

        if (!violations) {
            return res.status(404).json({
                message: 'Violator not found',
            });
        }

        return res.status(200).json(violations);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get violator details',
        });
    }
};
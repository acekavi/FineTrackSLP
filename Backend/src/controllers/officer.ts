import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import OfficerModel from '../models/officer';
import NicModel from '../models/nic';
import DrLicenceModel from '../models/drlicence';
import sequelize from '../config/sequelize';
import { RequestWithUser } from '../global-types';
import { Op } from 'sequelize';

const Officer = OfficerModel(sequelize);
const NIC = NicModel(sequelize);
const DrLicence = DrLicenceModel(sequelize);

export const create_user = async (req: Request, res: Response) => {
    try {
        const { officer_ID, username, nic, password, station_ID } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newOfficer = await Officer.create({
            officer_ID: officer_ID,
            nic,
            username: username.toLowerCase(),
            station_ID: station_ID.toLowerCase(),
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
            officer_ID: officer.officer_ID,
            station_ID: officer.station_ID,
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
        const licence_number = req.body.licence_number;

        const violater = await DrLicence.findOne({
            where: { licence_number },
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
            licence_number: violater.licence_number,
            expire_date: violater.expire_date,
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
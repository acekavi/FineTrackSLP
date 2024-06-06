import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import OfficerModel from '../models/officer';
import sequelize from '../config/sequelize';

const Officer = OfficerModel(sequelize);

const secretKey = process.env.JWT_SECRET || 'samplesecretkey';

export const create_user = async (req: Request, res: Response) => {
    try {
        const { officer_ID, username, password, station_ID } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newOfficer = await Officer.create({
            officer_ID: officer_ID.toLowerCase(),
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

        const token = jwt.sign({ username: officer.username, role: "officer" }, secretKey, { expiresIn: '8h' });

        return res.status(200).json({
            message: 'Signin successful',
            token,
            user: {
                username: officer.username,
                role: 'officer',
                officer_ID: officer.officer_ID,
                station_ID: officer.station_ID,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to log in officer',
        });
    }
};

export const get_user = async (req: Request, res: Response) => {
    try {
        const username = req.query.username as string;

        const officer = await Officer.findOne({ where: { username } });

        if (!officer) {
            return res.status(404).json({
                message: 'Officer not found',
            });
        }

        return res.status(200).json({
            message: 'Officer details found!',
            officer,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get officer',
        });
    }
};

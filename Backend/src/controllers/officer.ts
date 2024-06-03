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
            officer_ID,
            username,
            station_ID,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'Officer created successfully',
        });
    } catch (error: any) {
        console.log(error.name);
        res.status(500).json({
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

        res.status(200).json({
            message: 'Signin successful',
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to log in officer',
        });
    }
};

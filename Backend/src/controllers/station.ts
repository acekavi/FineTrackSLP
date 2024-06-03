import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import StationModel from '../models/station';
import sequelize from '../config/sequelize';

const Station = StationModel(sequelize);

const secretKey = process.env.JWT_SECRET || 'samplesecretkey';

export const create_user = async (req: Request, res: Response) => {
    try {
        const { station_ID, username, password, location } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStation = await Station.create({
            station_ID,
            username,
            password: hashedPassword,
            location,
        });

        res.status(201).json({
            message: 'Station created successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to create station',
        });
    }
};

export const signin_user = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const station = await Station.findOne({ where: { username } });

        if (!station) {
            return res.status(404).json({
                message: 'Station not found',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, station.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password',
            });
        }

        const token = jwt.sign({ username: station.username, role: "station" }, secretKey, { expiresIn: '8h' });

        res.status(200).json({
            message: 'Signin successful',
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to log in station',
        });
    }
};

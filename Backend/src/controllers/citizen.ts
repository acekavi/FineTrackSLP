import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CitizenModel from '../models/citizen';
import sequelize from '../config/sequelize';

const Citizen = CitizenModel(sequelize);

const secretKey = process.env.JWT_SECRET || 'samplesecretkey';

export const create_user = async (req: Request, res: Response) => {
    try {
        const { NIC, username, password, mobile } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await Citizen.create({
            NIC,
            username,
            password: hashedPassword,
            mobile,
        });

        res.status(201).json({
            message: 'Citizen created successfully',
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Failed to create citizen',
                error: error.message,
            });
        } else {
            res.status(500).json({
                message: 'Failed to create citizen',
                error: String(error),
            });
        }
    }
};

export const signin_user = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const citizen = await Citizen.findOne({ where: { username } });

        if (!citizen) {
            return res.status(404).json({
                message: 'Citizen not found',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, citizen.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password',
            });
        }

        const token = jwt.sign({ username: citizen.username }, secretKey, { expiresIn: '8h' });

        res.status(200).json({
            message: 'Signin successful',
            token,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Signin failed',
                error: error.message,
            });
        } else {
            res.status(500).json({
                message: 'Signin failed',
                error: String(error),
            });
        }
    }
};

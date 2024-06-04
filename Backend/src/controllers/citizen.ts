import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CitizenModel from '../models/citizen';
import sequelize from '../config/sequelize';
import { RequestWithUser } from '../global-types';

const Citizen = CitizenModel(sequelize);

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
    } catch (error: any) {
        console.log(error.name);
        res.status(500).json({
            message: 'Failed to create user',
        });
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

        const token = jwt.sign({ username: citizen.username, role: "citizen" }, "finetrack2024", { expiresIn: '8h' });

        res.status(200).json({
            message: 'Signin successful',
            token,
            user: {
                NIC: citizen.NIC,
                username: citizen.username,
                role: 'citizen',
                mobile: citizen.mobile,
                earned_score: citizen.earned_score,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to log in citizen',
        });
    }
};

export const get_user = async (req: RequestWithUser, res: Response) => {
    try {
        const decodedToken = req.user;
        if (!decodedToken) {
            return res.status(401).json({
                message: 'Unauthorized access',
            });
        }

        const citizen = await Citizen.findOne({ where: { username: decodedToken.username } });

        if (!citizen) {
            return res.status(404).json({
                message: 'Citizen not found',
            });
        }

        res.status(200).json({
            NIC: citizen.NIC,
            username: citizen.username,
            mobile: citizen.mobile,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get citizen',
        });
    }
};

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NIC, Offence, Officer, Station } from '../models';
import { RequestWithUser } from '../global-types';


export const create_user = async (req: Request, res: Response) => {
    try {
        const { station_ID, username, password, location } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStation = await Station.create({
            stationId: station_ID.toLowerCase(),
            username: username.toLowerCase(),
            password: hashedPassword,
            location: location.toLowerCase(),
        });

        return res.status(201).json({
            message: 'Station created successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
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

        const token = jwt.sign({ username: station.username, role: "station" }, "finetrack2024", { expiresIn: '8h' });

        return res.status(200).json({
            message: 'Signin successful',
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to log in station',
        });
    }
};

export const get_user = async (req: RequestWithUser, res: Response) => {
    try {
        const username = req.user?.username;
        const station = await Station.findOne({ where: { username } });

        if (!station) {
            return res.status(404).json({
                message: 'Station not found',
            });
        }

        return res.status(200).json(station);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get station',
        });
    }
}

export const get_officers = async (req: RequestWithUser, res: Response) => {
    try {
        const username = req.user?.username;
        const station = await Station.findOne({ where: { username } });

        if (!station) {
            return res.status(404).json({
                message: 'Station not found',
            });
        }

        const officers = await Officer.findAll({
            where: { stationId: station.stationId },
            include: {
                model: NIC,
                attributes: ['firstName', 'surname'],
            },
        });

        return res.status(200).json(officers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get officers',
        });
    }
}

export const add_officer = async (req: RequestWithUser, res: Response) => {
    try {
        const { officer_ID, username, nic, password } = req.body;
        const station_ID = await Station.findOne({
            where: { username: req.user?.username },
            attributes: ['stationId'],
        });
        const hashedPassword = await bcrypt.hash(password, 10);

        const newOfficer = await Officer.create({
            officerId: officer_ID,
            nicNumber: nic.toLowerCase(),
            username: username.toLowerCase(),
            stationId: station_ID?.stationId.toLowerCase(),
            password: hashedPassword,
        }).catch((error) => {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({
                    message: 'Username already exists',
                });
            }
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
}

export const add_offence = async (req: RequestWithUser, res: Response) => {
    try {
        const { offence_type, description, score, fee, enabled } = req.body;

        const newOffence = await Offence.create({
            offenceType: offence_type,
            description: description,
            enabled: enabled,
            score: score,
            fee: fee,
        });

        return res.status(201).json({
            message: 'Offence created successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to create offence',
        });
    }
}

export const get_offences = async (req: RequestWithUser, res: Response) => {
    try {
        const offenceType = req.body.offence_type;
        const offences = await Offence.findAll(
            {
                where: { offenceType }
            }
        );

        return res.status(200).json(offences);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get offences',
        });
    }
}
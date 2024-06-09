import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../global-types';
import { Citizen, FineRecord, NIC, Offence } from '../models';

export const create_user = async (req: Request, res: Response) => {
    try {
        const { nicNumber, username, password, mobile } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (!nicNumber || !username || !password || !mobile) {
            return res.status(400).json({
                message: 'Missing required fields',
            });
        }

        const citizen = await Citizen.findOne({ where: { nicNumber: nicNumber.toLowerCase() } });

        if (citizen) {
            if (citizen.username !== null) {
                return res.status(409).json({
                    message: 'User already exists for this NIC number',
                });
            }
            await citizen.update({
                username: username.toLowerCase(),
                password: hashedPassword,
                mobile,
            });
        } else {
            await Citizen.create({
                nicNumber: nicNumber.toLowerCase(),
                username: username.toLowerCase(),
                password: hashedPassword,
                mobile,
            });
        }

        return res.status(201).json({
            message: 'Citizen create successfully',
        });
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                message: 'Username already exists',
            });
        }
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(422).json({
                message: 'Invalid NIC number',
            });
        }
        console.log(error.name);
        return res.status(500).json({
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

        return res.status(200).json({
            message: 'Signin successful',
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to log in citizen',
        });
    }
};

export const get_user = async (req: RequestWithUser, res: Response) => {
    try {
        const username = req.user?.username;

        const citizen = await Citizen.findOne({
            where: { username },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [{
                model: NIC,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }]
        });

        if (!citizen) {
            return res.status(404).json({
                message: 'Citizen not found',
            });
        }

        return res.status(200).json(citizen);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get citizen',
        });
    }
};

export const get_fine_records = async (req: RequestWithUser, res: Response) => {
    try {
        const username = req.user?.username;

        const citizen = await Citizen.findOne({
            where: { username },
            attributes: ['nicNumber']
        });

        // Fetch the violator's NIC details
        const violations = await FineRecord.findAll({
            where: { nicNumber: citizen?.nicNumber },
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

        return res.status(200).json(violations);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get fine records',
        });
    }
};

export const check_fine = async (req: RequestWithUser, res: Response) => {
    try {
        const { fineId } = req.query;
        const username = req.user?.username;

        const citizen = await Citizen.findOne({
            where: { username },
            attributes: ['nicNumber']
        });

        const fineRecord = await FineRecord.findOne({
            where: { fineId: fineId as string },
            include: [
                {
                    model: Offence,
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        if (!fineRecord) {
            return res.status(404).json({
                message: 'Fine record not found',
            });
        }

        if (fineRecord.nicNumber !== citizen?.nicNumber) {
            return res.status(403).json({
                message: 'Unauthorized to view this fine',
            });
        }

        return res.status(200).json(fineRecord);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to check fine',
        });
    }
}

export const pay_fine = async (req: RequestWithUser, res: Response) => {
    try {
        const { fineId } = req.body;
        const username = req.user?.username;

        const citizen = await Citizen.findOne({
            where: { username },
            attributes: ['nicNumber']
        });

        const fineRecord = await FineRecord.findOne({
            where: { fineId },
            include: [
                {
                    model: Offence,
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        if (!fineRecord) {
            return res.status(404).json({
                message: 'Fine record not found',
            });
        }

        if (fineRecord.nicNumber !== citizen?.nicNumber) {
            return res.status(403).json({
                message: 'Unauthorized to pay this fine',
            });
        }

        await fineRecord.update({
            isPaid: true,
            payReferenceId: Math.floor(Math.random() * 1000000).toString()
        });

        return res.status(200).json({
            message: 'Fine paid successfully',
            fineRecord
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to pay fine',
        });
    }
}
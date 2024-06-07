import { JwtPayload } from "jsonwebtoken";
import { Request } from 'express';
import { Officer } from "./config/sync";
import { Model } from "sequelize";

export interface DecodedToken extends JwtPayload {
    username: string;
    role: string;
    iat: number;
    exp: number;
}

export interface RequestWithUser extends Request {
    user?: DecodedToken;
}

export class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export interface AssociatableModel extends Model {
    associate?: (models: any) => void;
}
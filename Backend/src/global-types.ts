import { JwtPayload } from "jsonwebtoken";

export interface DecodedToken extends JwtPayload {
    email: string;
    userId: string;
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
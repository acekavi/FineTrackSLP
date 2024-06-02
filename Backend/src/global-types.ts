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

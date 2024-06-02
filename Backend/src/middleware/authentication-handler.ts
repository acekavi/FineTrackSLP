import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Assuming the secretKey is defined in your environment variables correctly
const secretKey: string = process.env.JWT_SECRET || '';

// Extend the Express Request type to include the user property
interface RequestWithUser extends Request {
    user?: string | JwtPayload;
}

function checkBearerToken(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
): Response | void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Unauthorized - Missing bearer token',
            auth: false,
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized - Invalid token',
                auth: false,
            });
        }

        req.user = decoded;
        next();
    });
}

export default checkBearerToken;

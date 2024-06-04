import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { DecodedToken } from '../global-types';

// Extend the Express Request type to include the user property
interface RequestWithUser extends Request {
    user?: string | DecodedToken;
}

function checkBearerToken(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
): Response | void {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized - Missing bearer authHeader' });
    }

    const tokenValue = authHeader.split(' ')[1];

    jwt.verify(tokenValue, "finetrack2024", (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized - Invalid token',
                auth: false,
            });
        }

        req.user = decoded as DecodedToken;
        next();
    });
}

export default checkBearerToken;

import express from 'express';
import * as CitizenController from '../controllers/citizen';
import checkBearerToken from '../middleware/authentication-handler';
import { Request } from 'express';

export interface RequestWithUser extends Request {
    user?: any; // Adjust the type of 'user' according to your application's user type
}


const router = express.Router();

router.post('/register', CitizenController.create_user);
router.post('/login', CitizenController.signin_user);
router.get('/details', checkBearerToken, CitizenController.get_user);

export default router;

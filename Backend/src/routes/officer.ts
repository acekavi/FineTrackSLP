import express from 'express';
import * as OfficerController from '../controllers/officer';
import checkBearerToken from '../middleware/authentication-handler';

const router = express.Router();

router.post('/register', OfficerController.create_user);
router.post('/login', OfficerController.signin_user);
router.get('/details', checkBearerToken, OfficerController.get_user);

router.post('/check-driver', checkBearerToken, OfficerController.check_drivers_licence);

export default router;

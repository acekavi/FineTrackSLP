import express from 'express';
import * as CitizenController from '../controllers/citizen';
import checkBearerToken from '../middleware/authentication-handler';

const router = express.Router();

router.post('/register', CitizenController.create_user);
router.post('/login', CitizenController.signin_user);
router.get('/details', checkBearerToken, CitizenController.get_user);

router.get('/fine-records', checkBearerToken, CitizenController.get_fine_records);

export default router;

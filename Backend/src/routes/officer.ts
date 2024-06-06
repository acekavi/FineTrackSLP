import express from 'express';
import * as OfficerController from '../controllers/officer';

const router = express.Router();

router.post('/register', OfficerController.create_user);
router.post('/login', OfficerController.signin_user);
router.get('/details', OfficerController.get_user);

export default router;

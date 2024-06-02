import express from 'express';
import * as CitizenController from '../controllers/citizen';

const router = express.Router();

router.post('/register', CitizenController.create_user);
router.post('/login', CitizenController.signin_user);

export default router;

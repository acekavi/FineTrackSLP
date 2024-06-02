import express from 'express';
import * as StationController from '../controllers/station';

const router = express.Router();

router.post('/register', StationController.create_user);
router.post('/login', StationController.signin_user);

export default router;

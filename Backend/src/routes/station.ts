import express from 'express';
import * as StationController from '../controllers/station';
import checkBearerToken from '../middleware/authentication-handler';

const router = express.Router();

router.post('/register', StationController.create_user);
router.post('/login', StationController.signin_user);

router.get('/details', checkBearerToken, StationController.get_user);
router.get('/officers', checkBearerToken, StationController.get_officers);
router.post('/add-officer', checkBearerToken, StationController.add_officer);
router.post('/add-offence', checkBearerToken, StationController.add_offence);
router.post('/offences', checkBearerToken, StationController.get_offences);

export default router;

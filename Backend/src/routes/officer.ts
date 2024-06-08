import express from 'express';
import * as OfficerController from '../controllers/officer';
import checkBearerToken from '../middleware/authentication-handler';

const router = express.Router();

router.post('/register', OfficerController.create_user);
router.post('/login', OfficerController.signin_user);
router.get('/details', checkBearerToken, OfficerController.get_user);

router.post('/check-driver', checkBearerToken, OfficerController.check_drivers_licence);
router.post('/check-nic-passort', checkBearerToken, OfficerController.check_nic_passport);

router.post("/violater/details", checkBearerToken, OfficerController.get_violater_details);
router.post("/violater/fine-records", checkBearerToken, OfficerController.get_violator_fine_records);
router.post("/violator/add-fine", checkBearerToken, OfficerController.add_fine_record);

export default router;

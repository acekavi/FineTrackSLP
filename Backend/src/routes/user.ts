import express from 'express';
import * as UserController from '../controllers/user';
import checkBearerToken from '../middleware/authentication-handler';

const router = express.Router();

// Authentication and User controller end points
// router.post('/register', UserController.create_user);
// router.post('/signin', UserController.signin_user);
// router.get('/details', CheckAuth, UserController.get_user);
// router.get('/logged/user', CheckAuth, UserController.get_logged_user);
// router.get('/check/auth', CheckAuth, UserController.get_auth_status);
// router.post('/add/achievement', CheckAuth, UserController.add_achievement);
// router.post('/add/badge', CheckAuth, UserController.add_badge);

// router.put('/user/update/:id', CheckAuth, UserController.update_user);
// router.put('/user/update/password/:id', CheckAuth, UserController.update_user_password);
// router.put('/user/check_unique_email', CheckAuth, UserController.check_unique_email);


// router.put('/user/password-reset/:id', CheckAuth, UserController.first_time_password_reset);

export default router;
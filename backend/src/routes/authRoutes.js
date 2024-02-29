import {Router} from 'express'
import { register,login,getProfile, forgotPassword, resetPassword } from "../controllers/authController.js";
import { isLoggedIn } from '../middlewares/authMiddleware.js';
const router = Router()

router.post('/register',register);
router.post('/login',login);
router.get('/getProfile',isLoggedIn,getProfile);
router.post('/auth/forgotpassword',forgotPassword)
router.post('/auth/resetpassword/:resetToken',resetPassword)

export default router 


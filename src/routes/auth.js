import { Router } from 'express';

import passportFacebook from '../middlewares/passportFacebook'
import {authController} from '../controllers/auth'
import passportNormal from '../middlewares/authPaspport'



const router = Router();

router.get('/login' ,authController.getLogin)

router.post('/login',passportNormal.authenticate('login'), authController.postLogin)

router.get('/auth/facebook', passportFacebook.authenticate('facebook', { scope: ['email'] }) );

router.get('/auth/facebook/callback', passportFacebook.authenticate('facebook', {successRedirect: '/datos',  failureRedirect: '/fail', }) );

router.get('/fail', authController.failPage);

router.get('/datos', authController.data);
//  router.post('/login',passport.authenticate('login'), authController.postLogin)

 router.get('/logout', authController.getLogOut)

 router.post('/signup', passportNormal.authenticate('signup'), authController.postSignUp)

 router.get('/signup', authController.getSignUp)

 router.get('/randoms', authController.randoms)

 router.get('/info', authController.info)
 


export default router

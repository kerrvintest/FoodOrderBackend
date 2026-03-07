import express from 'express';
import { VendorGetProfile, VendorSignin, VendorUpdateProfile, VendorUpdateService } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();

router.post('/signin', VendorSignin)

router.use(Authenticate)
router.get('/profile', VendorGetProfile)
router.patch('/profile', VendorUpdateProfile)
router.patch('/service', VendorUpdateService)


export { router as VendorRoute }
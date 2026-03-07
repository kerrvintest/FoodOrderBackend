import express from 'express';
import { VendorGetProfile, VendorSignin, VendorUpdateProfile, VendorUpdateService } from '../controllers';

const router = express.Router();

router.post('/signin', VendorSignin)

router.get('/profile', VendorGetProfile)
router.patch('/profile', VendorUpdateProfile)
router.patch('/service', VendorUpdateService)


export { router as VendorRoute }
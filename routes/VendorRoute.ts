import express from 'express';
import multer from 'multer';

import { VendorGetProfile, VendorSignin, VendorUpdateProfile, VendorUpdateService } from '../controllers';
import { Authenticate } from '../middlewares';
import { VendorCreateFood, VendorGetFoods } from '../controllers';

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        let name = new Date().toISOString() + '_' + file.originalname
        name = name.replace(/[\s/:]/g, '') //REGEX \s - search for white space, / search for slash, :, [] - anything inside will be searched.
        cb(null, name)
    }
})

const images = multer({ storage: imageStorage }).array('images', 10)

router.post('/signin', VendorSignin)

router.use(Authenticate)
router.get('/profile', VendorGetProfile)
router.patch('/profile', VendorUpdateProfile)
router.patch('/service', VendorUpdateService)

router.post('/food', images, VendorCreateFood)
router.get('/foods', VendorGetFoods)

export { router as VendorRoute }
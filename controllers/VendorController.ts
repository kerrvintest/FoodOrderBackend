import { Request, Response, NextFunction } from 'express'
import { VendorLoginInputs } from '../dto'
import { FindVendor } from './AdminController'
import { ComparePassword, GenerateSignature } from '../utility/PasswordUtility'

export const VendorSignin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VendorLoginInputs>req.body

    const vendor = await FindVendor(undefined, email)
    
    if (vendor != null) {
        const validation = await ComparePassword(password, vendor.password, vendor.salt)
        if (validation) {

            const signature = GenerateSignature({
                _id: vendor.id,
                email: vendor.email,
                name: vendor.name,
                foodTypes: vendor.foodType
            })




            return res.status(200).json(signature)
        }
    }

    return res.status(500).json({ message: "Invalid credential" })

}

export const VendorGetProfile = async (req: Request, res: Response, next: NextFunction) => {

}

export const VendorUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {

}

export const VendorUpdateService = async (req: Request, res: Response, next: NextFunction) => {

}
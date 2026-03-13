import { Request, Response, NextFunction } from 'express'
import { EditVendorInputes as EditVendorInputs, VendorLoginInputs } from '../dto'
import { FindVendor } from './AdminController'
import { ComparePassword, GenerateSignature } from '../utility/PasswordUtility'
import { Food, Vendor } from '../models'
import { CreateFoodInputs } from '../dto/Food.dto'

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
    const user = req.user;

    if (user) {
        const vendor = await FindVendor(user._id)
        return res.status(200).json(vendor)
    }
}

export const VendorUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { name, phone, address, foodType } = <EditVendorInputs>req.body

    const user = req.user;

    if (user) {
        const vendor = await FindVendor(user._id)
        if (vendor) {
            vendor.name = name;
            vendor.phone = phone;
            vendor.address = address;
            vendor.foodType = foodType;

            const result = await vendor.save();

            return res.status(200).json(result)
        }
    }
    return res.status(500).json({ message: "user not found" })

}

export const VendorUpdateService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const vendor = await FindVendor(user._id);

        if (vendor) {
            vendor.serviceAvailability = !vendor.serviceAvailability;

            const result = await vendor.save();
            if (result) {
                return res.status(200).json(result)
            }
        }


    }
    return res.status(500).json({ message: "user not found" })

}

export const VendorCreateFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (user) {
        const { name, description, category, foodType, readyTime, price } = <CreateFoodInputs>req.body
        const vendor = await FindVendor(user._id)
        if (vendor) {

            const files = req.files as [Express.Multer.File]
            const images = files.map((file: Express.Multer.File) => file.filename)
            //ADD DATABASE COMMIT FUNCTIONALITY
            const newFood = await Food.create({
                vendorId: vendor.id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                price: price,
                images: images
            })
            if (newFood) {
                vendor.foods.push(newFood)
                const result = await vendor.save()

                return res.status(200).json(newFood)
            }
        }
    }

    return res.status(500).json({ message: "Something went wrong..." })

}

export const VendorGetFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (user) {
        const foods = await Food.find({ vendorId: user._id })
        if (foods && foods.length > 0) {
            return res.status(200).json(foods)
        } else {
            return res.status(200).json({ message: "No listed food." })
        }
    }

    return res.status(500).json("something went wrong...")

}
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';


import { CreateVendorInputs } from '../dto';
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility/PasswordUtility';

export const FindVendor = async (id: string | undefined, email?: string) => {
    if (email) {
        return await Vendor.findOne({ email })
    } else if (id) {
        return await Vendor.findById(id)
    } else {
        return await Vendor.find()
    }
}

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, ownerName, email, phone, pincode, address, foodType, password } = <CreateVendorInputs>req.body;
    try {

        const isEmailExists = await FindVendor(undefined, email)
        if (isEmailExists) {
            return res.status(500).json({ message: "email already exists" })
        }

        const salt = await GenerateSalt();

        const hashedPassword = await GeneratePassword(password, salt)

        const createVendor = await Vendor.create({
            name: name,
            ownerName: ownerName,
            email: email,
            phone: phone,
            pincode: pincode,
            address: address,
            foodType: foodType,
            password: hashedPassword,
            salt: salt
        })

        if (createVendor) {

        }

        return res.json(createVendor)
    } catch (error) {
        res.status(500).json({ message: error })
    }

}

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {

    const vendors = await FindVendor(undefined);

    if (vendors != null) {
        return res.status(200).json(vendors);
    }

    return res.status(500).json({ message: "No vendors found" })

}

export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id as string;

    if (mongoose.Types.ObjectId.isValid(id)) {
        const vendor = await FindVendor(id)

        if (vendor) {
            return res.json(vendor)
        }
    }

    return res.status(500).json({ message: "Something went wrong" })

}
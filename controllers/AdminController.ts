import express, { Request, Response, NextFunction } from 'express';
import { CreateVendorInputs } from '../dto';

export const createVendor = (req: Request, res: Response, next: NextFunction) => {
    const { name, ownerName, email, phone, pincode, address, foodType, password } = <CreateVendorInputs>req.body;

    return res.json({ name, ownerName, email, phone, pincode, address, foodType, password })
}

export const getVendors = (req: Request, res: Response, next: NextFunction) => {


}

export const getVendorById = (req: Request, res: Response, next: NextFunction) => {


}
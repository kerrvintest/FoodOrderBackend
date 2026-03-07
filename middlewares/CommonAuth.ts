import express, { Request, Response, NextFunction } from 'express'
import { ValidateSignature } from '../utility/PasswordUtility'

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await ValidateSignature(req)
    if (validate) {
        next();
    } else {
        return res.status(500).json({ message: "No authorized" })
    }
}
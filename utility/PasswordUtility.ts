import { Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { VendorPayload } from '../dto';
import { APP_SECRET } from '../config';
import { AuthPayload } from '../dto/Auth.dto';

export const GenerateSalt = async () => await bcrypt.genSalt();

export const GeneratePassword = async (password: string, salt: string) => await bcrypt.hash(password, salt);

export const ComparePassword = async (enteredPassword: string, password: string, salt: string) => await GeneratePassword(enteredPassword, salt) === password

export const GenerateSignature = (payload: VendorPayload) => jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });

export const ValidateSignature = async (req: Request) => {

    const signature = req.get('Authorization');

    if (signature) {
        const payload = jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload

        req.user = payload;

        return true
    }

    return false
}
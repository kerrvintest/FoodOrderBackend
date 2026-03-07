import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { VendorPayload } from '../dto';
import { APP_SECRET } from '../config';

export const GenerateSalt = async () => await bcrypt.genSalt();

export const GeneratePassword = async (password: string, salt: string) => await bcrypt.hash(password, salt);

export const ComparePassword = async (enteredPassword: string, password: string, salt: string) => await GeneratePassword(enteredPassword, salt) === password

export const GenerateSignature = (payload: VendorPayload) => jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });

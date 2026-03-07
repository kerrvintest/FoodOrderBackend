import bcrypt from 'bcrypt';

export const GenerateSalt = async () => await bcrypt.genSalt();

export const GeneratePassword = async (password: string, salt: string) => bcrypt.hash(password, salt);

export const ComparePassword = () => { }


import { compare, hash, genSalt } from 'bcrypt';

export const hashPassword = async (password: string) => {
    const salt = await genSalt(10);
    return await hash(password, salt);
};

export const comparePassword = async (password: string, receivedPassword: string) => {
    return await compare(password, receivedPassword);
};


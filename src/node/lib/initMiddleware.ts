import { ValidationChain } from "express-validator";
import { NextApiRequest, NextApiResponse } from "next";
export default function initMiddleware(middleware: any) {
    return (validations: ValidationChain[], req: NextApiRequest, res: NextApiResponse) =>
        new Promise((resolve, reject) => {
            middleware(validations, req, res, (result: any) => {
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve(result);
            });
        });
}
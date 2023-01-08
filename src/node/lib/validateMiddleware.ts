import { ValidationChain } from "express-validator";
import { ValidationError } from "express-validator/src/base";
import { ResultFactory } from "express-validator/src/validation-result";

export default function validateMiddleware(validationResult: ResultFactory<ValidationError>) {
    return async (validations: ValidationChain[], req: any, res: any, next: any) => {
        await Promise.all(validations.map((validation: any) => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
}
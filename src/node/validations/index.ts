import { validationResult } from "express-validator";
import initMiddleware from "@/node/lib/initMiddleware";
import validateMiddleware from "@/node/lib/validateMiddleware";

const validateBody = initMiddleware(validateMiddleware(validationResult))

export default validateBody;
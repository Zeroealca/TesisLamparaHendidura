import { check } from "express-validator";

export const singupValidation = [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("email").notEmpty().withMessage("El email es obligatiorio").isEmail().withMessage("El email debe ser válido"),
    check("password").notEmpty().withMessage("La contraseña es obligatoria").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const loginValidation = [
    check("email").notEmpty().withMessage("El email es obligatiorio").isEmail().withMessage("El email debe ser válido"),
    check("password").notEmpty().withMessage("La contraseña es obligatoria")
];


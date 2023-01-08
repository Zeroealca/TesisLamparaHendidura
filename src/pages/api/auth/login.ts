import pool from "@/node/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { loginValidation } from "@/node/validations/auth";
import validateBody from "@/node/validations";
import { validationResult } from "express-validator";
import { comparePassword } from "@/node/utils/auth";

export interface Usuario {
  name: string;
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      await validateBody(loginValidation, req, res)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      return await handlerLogin(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handlerLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = ? ",
    [req.body.email]
  ) as Usuario[];
  if (result.length === 0) {
    return res.status(404).json({
      message: "Usuario no encontrado",
      data: undefined,
    });
  }
  const validPassword = await comparePassword(
    req.body
      .password as string,
    result[0].password
  );
  if (!validPassword) {
    return res.status(401).json({
      message: "Usuario o contraseña incorrecta",
      data: undefined,
    });
  }
  const { password, ...otherdata } = result[0];
  return res.status(200).json({
    message: "Usuario Logeado con éxito",
    data: otherdata,
  });
};

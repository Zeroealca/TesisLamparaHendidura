import pool from "@/node/config/db";
import { PrismaService } from "@/node/prisma/prisma.service";
import { hashPassword } from "@/node/utils/auth";
import validateBody from "@/node/validations";
import { singupValidation } from "@/node/validations/auth";
import { validationResult } from "express-validator";
import { NextApiRequest, NextApiResponse } from "next";

const handlerSignup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, email, password } = req.body;
    const encryptpassword = await hashPassword(password);
    const prismaService = new PrismaService();
    await prismaService.user.create({
      data: {
        name,
        email,
        password: encryptpassword,
      },
    });
    return res.status(200).json({
      message: "Usuario creado exitosamente",
      data: {
        name,
        email,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await validateBody(singupValidation, req, res);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      return await handlerSignup(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

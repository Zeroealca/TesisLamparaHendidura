import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/node/config/db";
import { hashPassword } from "@/node/utils/auth";
import { sendRecoveryMail } from "@/node/mail/mailController";
import { sign, verify } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      if (!req.query.token) {
        return await handlerSendRecoveryMail(req, res);
      } else {
        return await handlerChangePassword(req, res);
      }
    case "PUT":
      return await handlerChangePassword(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handlerSendRecoveryMail = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const recovery_token = sign(
    { email: req.query.email },
    process.env.NEXTAUTH_SECRET || "",
    {
      expiresIn: "15m",
    }
  );
  console.log(recovery_token);
  const updateResult = (await pool.query(
    "UPDATE users SET recovery_token = ? WHERE email = ?",
    [recovery_token, req.query.email]
  )) as any;
  if (updateResult.affectedRows === 0) {
    return res.status(404).json({
      message: "Usuario no encontrado",
      data: undefined,
    });
  }
  const result = (await pool.query(
    "SELECT id, name, email, recovery_token FROM users WHERE email = ? ",
    [req.query.email]
  )) as any;
  if (result.length === 0) {
    return res.status(404).json({
      message: "Usuario no encontrado",
      data: undefined,
    });
  }
  await sendRecoveryMail(result[0]).then((r) => res.json({ msg: "listo" }));
};

const handlerChangePassword = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email } = req.query as {
    email: string;
  };
  const { password, token } = req.body as {
    password: string;
    token: string;
  };

  try {
    const verifiedToken = verify(token, process.env.NEXTAUTH_SECRET || "");

    if (!verifiedToken) {
      return res.status(401).json({
        message: "Token invalido",
        data: undefined,
      });
    }

    const hashedPassword = await hashPassword(password);

    const updateResult = (await pool.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, email]
    )) as any;
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
        data: undefined,
      });
    }
    res.status(200).json({
      message: "Contraseña actualizada",
      data: undefined,
    });
  } catch (error) {
    return res.status(401).json({
      message: error,
      data: undefined,
    });
  }
};

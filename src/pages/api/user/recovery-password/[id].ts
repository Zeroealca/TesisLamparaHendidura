import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/node/config/db";
import { hashPassword } from "@/node/utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await handlerSendRecoveryMail(req, res);
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
  console.log(req);
  res.json({ msg: "listo" });
};

const handlerChangePassword = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, password } = req.query;

  const result = (await pool.query("UPDATE users SET ? WHERE id = ? ", [
    { password: await hashPassword(password as string) },
    Number(id),
  ])) as any;
  if (result.affectedRows === 0) {
    return res.status(404).json({
      message: "Usuario no encontrado",
      data: undefined,
    });
  }

  return res.json({ msg: "listo" });
};

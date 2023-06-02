import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/node/config/db";
import { hashPassword } from "@/node/utils/auth";

interface Usuario {
  name: string;
  email: string;
  password: string;
  rol: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  switch (req.method) {
    case "POST":
      return await handleEnroll(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handleEnroll = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id_user, id_parallel } = req.body as {
    id_user: number;
    id_parallel: number;
  };
  console.log(req.body);

  const result = (await pool.query("INSERT INTO parallel_user SET ? ", {
    id_parallel,
    id_user,
  })) as any;
  if (result.affectedRows === 0) {
    return res.status(404).json({
      message: "Usuario no encontrado",
      data: undefined,
    });
  }

  return res.json(result);
};

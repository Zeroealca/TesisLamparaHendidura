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
  switch (req.method) {
    case "GET":
      return await handlerGetUser(req, res);
    case "PUT":
      return await handlerUserData(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handlerGetUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const result = (await pool.query(
    "SELECT users.id,users.name as name,users.email, users.rol, parallel_user.id_parallel as parallel_id, parallel.name as parallel_name FROM users INNER JOIN parallel_user on users.id = parallel_user.id_user INNER JOIN parallel on parallel_user.id_parallel = parallel.id WHERE users.id = ? ",
    [Number(id)]
  )) as Usuario[];
  if (result.length === 0) {
    return res.status(404).json({
      message: "Usuario no encontrado",
      data: undefined,
    });
  }
  return res.json(result[0]);
};

const handlerUserData = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body as Partial<Usuario>;
  const { id } = req.query;

  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  const result = (await pool.query("UPDATE users SET ? WHERE id = ? ", [
    data,
    Number(id),
  ])) as any;
  if (result.affectedRows === 0) {
    return res.status(404).json({
      message: "Usuario no encontrado",
      data: undefined,
    });
  }

  const _user = (await pool.query(
    "SELECT id,name,email, rol FROM users WHERE id = ? ",
    [Number(id)]
  )) as Usuario[];

  return res.json(_user[0]);
};

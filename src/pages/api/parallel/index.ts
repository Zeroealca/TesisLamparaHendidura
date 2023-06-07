import pool from "@/node/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export interface Parallel {
  id: number;
  name: string;
  docente: { id: number; name: string };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return await handlerCreateParallel(req, res);
    case "GET":
      return await handlerGetParallels(req, res);
    case "DELETE":
      return await handlerDeleteParallels(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handlerCreateParallel = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const result = (await pool.query("SELECT * FROM parallel where name like ?", [
    req.body.name.replaceAll(" ", "%"),
  ])) as Parallel[];
  if (result.length > 0) {
    return res.status(406).json({
      message: "Ya existe un paralelo con ese nombre",
      data: false,
    });
  }
  await pool.query("INSERT INTO parallel (name) VALUES (?)", [req.body.name]);
  return res.status(200).json({
    message: "Paralelo creado",
    data: true,
  });
};
const handlerDeleteParallels = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  (await pool.query(
    "DELETE FROM parallel_user where id_parallel = ? and id_user = ?",
    [req.query.parallel, req.query.user]
  )) as Parallel[];
  return res.status(200).json({
    message: "Paralelo creado",
    data: true,
  });
};
const handlerGetParallels = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const result = (await pool.query("SELECT * FROM parallel")) as Parallel[];
  if (result.length === 0) {
    return res.status(404).json({
      message: "No existen paralelos registrados",
      data: undefined,
    });
  }
  for (const r of result) {
    const docente = (await pool.query(
      "SELECT users.id, users.name from users inner join parallel_user on users.id = parallel_user.id_user where parallel_user.id_parallel = ? and users.rol = 'docente'",
      [r.id]
    )) as { id: number; name: string }[];
    r["docente"] = docente[0];
  }
  return res.status(200).json({
    message: "Paralelos encontrados",
    data: result,
  });
};

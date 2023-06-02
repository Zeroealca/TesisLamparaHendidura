import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import pool from "@/node/config/db";

const apiRout = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
  onError(error: any, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
});

apiRout.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const resul = (await pool.query(
    "SELECT id,name,email,rol FROM users WHERE rol = 'ESTUDIANTE'"
  )) as any;
  const result = (await pool.query(
    "SELECT users.id as id,users.name as name,users.email as email,users.rol as rol, parallel_user.id_parallel as id_parallel FROM users INNER JOIN parallel_user ON users.id = parallel_user.id_user where rol = 'ESTUDIANTE'"
  )) as any;
  return res.status(200).json({
    message: "No hay estudiantes registrados",
    data: result,
    data2: resul,
  });
});

export default apiRout;

export const config = {
  api: {
    bodyParser: false,
  },
};

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

apiRout.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id_image, id_user, comment } = req.body;
  const result = (await pool.query(
    "INSERT INTO comments (id_image, id_user, comment) VALUES (?, ?, ?)",
    [id_image, id_user, comment]
  )) as any;

  return res.status(200).json({
    message: "Comentario creado exitosamente",
    data: result,
  });
});

export default apiRout;

export const config = {
  api: {
    bodyParser: true,
  },
};

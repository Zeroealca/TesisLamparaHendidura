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
  const result = (await pool.query("SELECT * FROM technique")) as any;
  if (result.length === 0) {
    return res.status(404).json({
      message: "Tecnica no encontrada",
      data: undefined,
    });
  }
  return res.status(200).json({
    message: "Tecnica encontrada",
    data: result,
  });
});

export default apiRout;

export const config = {
  api: {
    bodyParser: false,
  },
};

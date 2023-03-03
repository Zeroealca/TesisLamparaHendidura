import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/node/config/db";

interface Image {
  id_image: string;
  name: string;
  url: string;
  details: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await handlerImageId(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handlerImageId = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const result = (await pool.query(
    "SELECT * FROM images WHERE externalId = ? ",
    [`user_${id}_disaeses`]
  )) as Image[];
  if (result.length === 0) {
    return res.status(404).json({
      message: "Imagen no encontrada",
      data: undefined,
    });
  }
  return res.status(200).json({
    message: "Imagen encontrada",
    data: result as Image[],
  });
};

import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/node/config/db";
import { Image } from "./[id]";

interface Comments {
  id: number;
  comment: string;
  id_user: number;
  name: string;
  date: Date;
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
  const result = (await pool.query(
    "SELECT * FROM images WHERE externalId LIKE 'user_%_disaeses' "
  )) as Image[];
  if (result.length === 0) {
    return res.status(404).json({
      message: "Imagen no encontrada",
      data: undefined,
    });
  }
  for (const image of result) {
    image.comments = (await pool.query(
      "SELECT * FROM comments INNER JOIN users ON comments.id_user = users.id WHERE id_image = ? ",
      [image.id_image]
    )) as Comments[];
    const id_user = image.externalId.split("_")[1];
    const user = (await pool.query("SELECT * FROM users WHERE id = ? ", [
      id_user,
    ])) as any[];
    image.name_user = user[0].name;
    image.comments.map((comment: any) => {
      if (comment.rol === "DOCENTE") image.isRevised = true;
      return {
        id: comment.id,
        comment: comment.comment,
        id_user: comment.id_user,
        name: comment.name,
        date: comment.created_at,
      };
    });
  }
  return res.status(200).json({
    message: "Imagen encontrada",
    data: result as Image[],
  });
};

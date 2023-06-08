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
  const students =
    req.query.rol == "ESTUDIANTE"
      ? ((await pool.query(
          "SELECT  users.id as id, users.rol, parallel_user.id_user FROM users inner join parallel_user on users.id = parallel_user.id_user WHERE users.rol = 'DOCENTE' AND parallel_user.id_parallel = ? ",
          [req.query.parallel_id]
        )) as any[])
      : ((await pool.query(
          "SELECT users.id as id, users.rol, parallel_user.id_user FROM users inner join parallel_user on users.id = parallel_user.id_user WHERE users.rol = 'ESTUDIANTE' AND parallel_user.id_parallel = ? ",
          [req.query.parallel_id]
        )) as any[]);
  const result = [] as Image[];
  for (const student of students) {
    const images = (await pool.query(
      `SELECT * FROM images WHERE externalId LIKE 'user_${student.id}_disaeses' `
    )) as Image[];

    if (images.length > 0) {
      result.push(...images);
    }
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

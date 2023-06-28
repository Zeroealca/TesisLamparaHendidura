import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/node/config/db";
import { Image } from "./[id]";
import { PrismaService } from "@/node/prisma/prisma.service";

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
  const { parallel_id, rol } = req.query;

  const prismaService = new PrismaService();

  const students = await prismaService.user.findMany({
    where: {
      rol: rol === "ESTUDIANTE" ? "DOCENTE" : "ESTUDIANTE",
      parallel_user: {
        some: {
          id_parallel: Number(parallel_id),
        },
      },
    },
  });

  const result = [] as any;

  for (const student of students) {
    const images = await prismaService.images.findMany({
      where: {
        externalId: `user_${student.id}_disaeses`,
      },
    });

    if (images.length > 0) {
      result.push(...images);
    }
  }
  for (const image of result) {
    image.comments = await prismaService.comments.findMany({
      where: {
        id_image: image.id_image,
      },
      include: {
        user: true,
      },
    });

    const id_user = image.externalId.split("_")[1];

    const user = await prismaService.user.findUnique({
      where: {
        id: id_user,
      },
    });

    image.name_user = user?.name;

    image.comments.map((comment: any) => {
      if (comment.user.rol === "DOCENTE") image.isRevised = true;
      return {
        id: comment.id,
        comment: comment.comment,
        id_user: comment.id_user,
        name: comment.user.name,
        date: comment.created_at,
      };
    });
  }
  return res.status(200).json({
    message: "Imagen encontrada",
    data: result as Image[],
  });
};

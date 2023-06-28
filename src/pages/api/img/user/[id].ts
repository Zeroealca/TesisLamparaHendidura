import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/node/config/db";
import { PrismaService } from "@/node/prisma/prisma.service";

export interface Image {
  id_image: string;
  name: string;
  url: string;
  details: string;
  isRevised: boolean;
  comments?: Comments[];
  name_user: string;
  externalId: string;
}
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
  const { id } = req.query;
  const prismaService = new PrismaService();

  const images = (await prismaService.images.findMany({
    where: {
      externalId: `user_${id}_disaeses`,
    },
  })) as any;

  if (!images) {
    return res.status(404).json({
      message: "Imagen no encontrada",
      data: undefined,
    });
  }
  for (const image of images) {
    image.comments = await prismaService.comments.findMany({
      where: {
        id_image: image.id_image,
      },
      include: {
        user: true,
      },
    });

    const id_user = image.externalId.split("_")[1];
    const user = await prismaService.user.findFirst({
      where: {
        id: id_user,
      },
    });
    image.name_user = user?.name;

    image.comments.map(async (comment: any) => {
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
    data: images as Image[],
  });
};

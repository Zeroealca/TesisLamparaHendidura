import { NextApiRequest, NextApiResponse } from "next";
import { deleteFile } from "@/node/drive/driveControllers";
import pool from "@/node/config/db";
import { PrismaService } from "@/node/prisma/prisma.service";

interface Image {
  id_image: string;
  name: string;
  url: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "DELETE":
      return await handlerDeleteImageId(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handlerDeleteImageId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query as { id: string };

  const prismaService = new PrismaService();

  const deletedFile = await deleteFile(id as string);

  if (!deletedFile) {
    return res.status(500).json({
      message: "Error deleting file",
    });
  }
  await prismaService.images.delete({
    where: {
      id_image: id,
    },
  });

  return res.status(200).json({
    message: "File deleted successfully",
    data: deletedFile,
  });
};

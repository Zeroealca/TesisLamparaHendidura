import { NextApiRequest, NextApiResponse } from "next";
import { deleteFile } from "@/node/drive/driveControllers";
import pool from "@/node/config/db";
import { PrismaService } from "@/node/prisma/prisma.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await handlerGetTechnique(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handlerGetTechnique = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { name } = req.query as { name: string };

  const prismaService = new PrismaService();

  const result = await prismaService.technique.findUnique({
    where: {
      id_technique: Number(name),
    },
  });

  if (!result) {
    return res.status(404).json({
      message: "Tecnica no encontrada",
      data: undefined,
    });
  }
  return res.status(200).json({
    message: "Tecnica encontrada",
    data: result,
  });
};

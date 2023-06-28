import { PrismaService } from "@/node/prisma/prisma.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await handlerAllInformation(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handlerAllInformation = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prismaService = new PrismaService();

  const disaeses = await prismaService.disaeses.findMany();

  if (!disaeses) {
    return res.status(404).json({
      message: "No existe registro de enfermedades",
      data: undefined,
    });
  }
  return res.status(200).json({
    message: "Enfermedades encontradas",
    data: disaeses,
  });
};

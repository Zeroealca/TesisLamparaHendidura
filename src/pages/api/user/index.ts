import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import pool from "@/node/config/db";
import { PrismaService } from "@/node/prisma/prisma.service";

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
  const prismaService = new PrismaService();

  const resul = await prismaService.user.findMany({
    where: {
      rol: "ESTUDIANTE",
    },
  });

  const result = await prismaService.user.findMany({
    where: {
      rol: "ESTUDIANTE",
    },
    include: {
      parallel_user: {
        include: {
          parallel: true,
          user: true,
        },
      },
    },
  });

  const resul2 = await prismaService.user.findMany({
    where: {
      rol: "DOCENTE",
    },
  });

  return res.status(200).json({
    message: "No hay estudiantes registrados",
    data: result,
    data2: resul,
    data3: resul2,
  });
});

export default apiRout;

export const config = {
  api: {
    bodyParser: false,
  },
};

import pool from "@/node/config/db";
import { PrismaService } from "@/node/prisma/prisma.service";
import { NextApiRequest, NextApiResponse } from "next";

export interface Parallel {
  id: number;
  name: string;
  docente: { id: number; name: string };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return await handlerCreateParallel(req, res);
    case "GET":
      return await handlerGetParallels(req, res);
    case "DELETE":
      return await handlerDeleteParallels(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handlerCreateParallel = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prismaService = new PrismaService();
  const parallels = await prismaService.parallel.findMany({
    where: {
      name: {
        contains: req.body.name,
      },
    },
  });

  if (!parallels) {
    return res.status(406).json({
      message: "Ya existe un paralelo con ese nombre",
      data: false,
    });
  }
  await prismaService.parallel.create({
    data: {
      name: req.body.name,
    },
  });

  return res.status(200).json({
    message: "Paralelo creado",
    data: true,
  });
};

const handlerDeleteParallels = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prismaService = new PrismaService();

  await prismaService.parallel_user.deleteMany({
    where: {
      id_parallel: Number(req.query.parallel),
      id_user: req.query.user as string,
    },
  });

  return res.status(200).json({
    message: "Paralelo creado",
    data: true,
  });
};
const handlerGetParallels = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prismaService = new PrismaService();
  const parallels = (await prismaService.parallel.findMany({
    include: {
      parallel_user: {
        include: {
          user: true,
        },
      },
    },
  })) as any;

  if (!parallels) {
    return res.status(404).json({
      message: "No existen paralelos registrados",
      data: undefined,
    });
  }
  for (const r of parallels) {
    const docente = await prismaService.user.findFirst({
      where: {
        parallel_user: {
          some: {
            id_parallel: r.id,
          },
        },
        rol: "DOCENTE",
      },
    });
    r.docente = docente;
  }
  return res.status(200).json({
    message: "Paralelos encontrados",
    data: parallels,
  });
};

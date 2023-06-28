import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/node/config/db";
import { hashPassword } from "@/node/utils/auth";
import { PrismaService } from "@/node/prisma/prisma.service";

interface Usuario {
  name: string;
  email: string;
  password: string;
  rol: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await handlerGetUser(req, res);
    case "PUT":
      return await handlerUserData(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handlerGetUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string };
  /* const result = (await pool.query(
    "SELECT users.id,users.name as name,users.email, users.rol FROM users WHERE users.id = ? ",
    [Number(id)]
  )) as Usuario[]; */

  const prismaService = new PrismaService();
  const user = await prismaService.user.findUnique({
    where: {
      id,
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

  const parallel = await prismaService.parallel.findFirst({
    where: {
      parallel_user: {
        some: {
          id_user: id,
        },
      },
    },
  });

  /* const parallel = (await pool.query(
    "SELECT parallel.name as parallel_name, parallel.id as parallel_id FROM parallel_user INNER JOIN parallel on parallel_user.id_parallel = parallel.id WHERE parallel_user.id_user = ? ",
    [Number(id)]
  )) as {
    parallel_name: string;
    parallel_id: number;
  }[]; */

  if (!user) {
    return res.status(404).json({
      message: "Usuario no encontrado",
      data: undefined,
    });
  }
  const { password, ...others } = user;
  return res.json({ ...others, parallel });
};

const handlerUserData = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body as Partial<Usuario>;
  const { id } = req.query as { id: string };

  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  const prismaService = new PrismaService();

  const user = await prismaService.user.update({
    data: {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.password && { password: data.password }),
      ...(data.rol && { rol: data.rol }),
    },
    where: {
      id,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "Usuario no encontrado",
      data: undefined,
    });
  }

  const { password, ...others } = user;

  return res.json({ ...others });
};

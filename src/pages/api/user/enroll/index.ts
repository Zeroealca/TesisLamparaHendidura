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
    case "POST":
      return await handleEnroll(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handleEnroll = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id_user, id_parallel } = req.body as {
    id_user: string;
    id_parallel: number;
  };

  const prismaService = new PrismaService();

  const enroll = await prismaService.parallel_user.create({
    data: {
      id_parallel,
      id_user,
    },
  });

  if (!enroll) {
    return res.status(404).json({
      message: "Usuario no encontrado",
      data: undefined,
    });
  }

  return res.json(enroll);
};

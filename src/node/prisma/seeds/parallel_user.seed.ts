import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { parallel_user } from "./data/parallel_user";

export const parallel_userSeed = async () => {
  await prisma.parallel_user.deleteMany();

  const dataPrisma = prisma.parallel_user.createMany({
    data: parallel_user.map((e) => e),
  });

  prisma.$disconnect();
  return "Usuarios paralelos creados: " + (await dataPrisma).count;
};

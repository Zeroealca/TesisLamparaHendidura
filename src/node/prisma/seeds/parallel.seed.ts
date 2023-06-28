import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { parallel } from "./data/parallel";

export const parallelSeed = async () => {
  await prisma.parallel.deleteMany();

  const dataPrisma = prisma.parallel.createMany({
    data: parallel.map((e) => e),
  });

  prisma.$disconnect();
  return "Paralelos creados: " + (await dataPrisma).count;
};

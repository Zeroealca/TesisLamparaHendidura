import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { technique } from "./data/technique";

export const techniqueSeed = async () => {
  await prisma.technique.deleteMany();

  const dataPrisma = prisma.technique.createMany({
    data: technique.map((e) => e),
  });

  prisma.$disconnect();
  return "Tecnicas creadas: " + (await dataPrisma).count;
};

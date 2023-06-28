import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { treatment } from "./data/treatment";

export const treatmentSeed = async () => {
  await prisma.treatment.deleteMany();

  const dataPrisma = prisma.treatment.createMany({
    data: treatment.map((e) => e),
  });

  prisma.$disconnect();
  return "Tratamientos creados: " + (await dataPrisma).count;
};

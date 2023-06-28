import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { early_symptoms } from "./data/early_symptoms";

export const early_symptomsSeed = async () => {
  await prisma.early_symptoms.deleteMany();

  const dataPrisma = prisma.early_symptoms.createMany({
    data: early_symptoms.map((e) => e),
  });

  prisma.$disconnect();
  return "Sintomas tempranos creados: " + (await dataPrisma).count;
};

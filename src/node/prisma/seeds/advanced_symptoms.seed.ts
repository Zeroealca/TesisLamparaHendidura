import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { advanced_symptoms } from "./data/advanced_symptoms";

export const advanced_symptomsSeed = async () => {
  await prisma.advanced_symptoms.deleteMany();

  const dataPrisma = prisma.advanced_symptoms.createMany({
    data: advanced_symptoms.map((e) => e),
  });

  prisma.$disconnect();
  return "Sintomas avanzados: " + (await dataPrisma).count;
};

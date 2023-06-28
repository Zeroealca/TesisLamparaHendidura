import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { symptom } from "./data/symptom";

export const symptomSeed = async () => {
  await prisma.symptom.deleteMany();

  const dataPrisma = prisma.symptom.createMany({
    data: symptom.map((e) => e),
  });

  prisma.$disconnect();
  return "Sintomas creados: " + (await dataPrisma).count;
};

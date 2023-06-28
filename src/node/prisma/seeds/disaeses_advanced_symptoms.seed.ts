import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { disaeses_advanced_symptoms } from "./data/disaeses_advanced_symptoms";

export const disaeses_advanced_symptomsSeed = async () => {
  await prisma.disaeses_advanced_symptoms.deleteMany();

  const dataPrisma = prisma.disaeses_advanced_symptoms.createMany({
    data: disaeses_advanced_symptoms.map((e) => e),
  });

  prisma.$disconnect();
  return "Enfermedades sintomas avanzados: " + (await dataPrisma).count;
};

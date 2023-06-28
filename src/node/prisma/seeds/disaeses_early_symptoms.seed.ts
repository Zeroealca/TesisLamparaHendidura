import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { disaeses_early_symptoms } from "./data/disaeses_early_symptoms";

export const disaeses_early_symptomsSeed = async () => {
  await prisma.disaeses_early_symptoms.deleteMany();

  const dataPrisma = prisma.disaeses_early_symptoms.createMany({
    data: disaeses_early_symptoms.map((e) => e),
  });

  prisma.$disconnect();
  return (
    "Enfermedeades sintomas tempranos creados: " + (await dataPrisma).count
  );
};

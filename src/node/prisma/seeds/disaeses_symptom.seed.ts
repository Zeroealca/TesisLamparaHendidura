import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { disaeses_diagnosis } from "./data/disaeses_symptom";

export const disaeses_symptomSeed = async () => {
  await prisma.disaeses_symptom.deleteMany();

  const dataPrisma = prisma.disaeses_symptom.createMany({
    data: disaeses_diagnosis.map((e) => e),
  });

  prisma.$disconnect();
  return "Enfermedades sintomas creados: " + (await dataPrisma).count;
};

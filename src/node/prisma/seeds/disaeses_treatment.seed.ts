import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { disaeses_treatment } from "./data/disaeses_treatment";

export const disaeses_treatmentSeed = async () => {
  await prisma.disaeses_treatment.deleteMany();

  const dataPrisma = prisma.disaeses_treatment.createMany({
    data: disaeses_treatment.map((e) => e),
  });

  prisma.$disconnect();
  return "Enfermedades tratamientos creados: " + (await dataPrisma).count;
};

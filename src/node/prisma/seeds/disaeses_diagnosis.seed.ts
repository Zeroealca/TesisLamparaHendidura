import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { disaeses_diagnosis } from "./data/disaeses_diagnosis";

export const disaeses_diagnosisSeed = async () => {
  await prisma.disaeses_diagnosis.deleteMany();

  const dataPrisma = prisma.disaeses_diagnosis.createMany({
    data: disaeses_diagnosis.map((e) => e),
  });

  prisma.$disconnect();
  return "Enfermedades diagnostico: " + (await dataPrisma).count;
};

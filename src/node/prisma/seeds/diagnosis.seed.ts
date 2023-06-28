import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { diagnosis } from "./data/diagnosis";

export const diagnosisSeed = async () => {
  await prisma.diagnosis.deleteMany();

  const dataPrisma = prisma.diagnosis.createMany({
    data: diagnosis.map((e) => e),
  });

  prisma.$disconnect();
  return "Diagnostico: " + (await dataPrisma).count;
};

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { disaeses } from "./data/disaesses";

export const disaesesSeed = async () => {
  await prisma.disaeses.deleteMany();

  const dataPrisma = prisma.disaeses.createMany({
    data: disaeses.map((e) => e),
  });

  prisma.$disconnect();
  return "Enfermedades creadas: " + (await dataPrisma).count;
};

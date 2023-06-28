import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { images } from "./data/images";

export const imagesSeed = async () => {
  await prisma.images.deleteMany();

  const dataPrisma = prisma.images.createMany({
    data: images.map((e) => e),
  });

  prisma.$disconnect();
  return "Imagenes creadas: " + (await dataPrisma).count;
};

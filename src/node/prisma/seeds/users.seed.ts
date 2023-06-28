import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import * as bcrypt from "bcrypt";
import { users } from "./data/user";

export const usersSeed = async () => {
  await prisma.parallel_user.deleteMany();
  await prisma.user.deleteMany();

  const dataPrisma = prisma.user.createMany({
    data: users.map((user) => {
      return {
        ...user,
        password: bcrypt.hashSync(user.password, 10),
      };
    }),
  });

  prisma.$disconnect();
  return "Usuarios creados: " + (await dataPrisma).count;
};

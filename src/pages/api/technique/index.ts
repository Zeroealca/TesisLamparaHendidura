import { PrismaService } from "@/node/prisma/prisma.service";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const apiRout = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
  onError(error: any, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
});

apiRout.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const prismaService = new PrismaService();
  const techniques = await prismaService.technique.findMany();

  if (!techniques) {
    return res.status(404).json({
      message: "Tecnicas no encontradas",
      data: undefined,
    });
  }
  return res.status(200).json({
    message: "Tecnica encontrada",
    data: techniques,
  });
});

export default apiRout;

export const config = {
  api: {
    bodyParser: false,
  },
};

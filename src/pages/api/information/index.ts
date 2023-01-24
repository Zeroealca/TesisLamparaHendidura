import pool from "@/node/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export interface Disaese {
  id: number;
  name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return await handlerAllInformation(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const handlerAllInformation = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await pool.query(
    "SELECT * FROM disaeses"
  ) as Disaese[];
  if (result.length === 0) {
    return res.status(404).json({
      message: "No existe registro de enfermedades",
      data: undefined,
    });
  }
  return res.status(200).json({
    message: "Enfermedades encontradas",
    data: result,
  });
};


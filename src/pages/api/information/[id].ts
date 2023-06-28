import { NextApiRequest, NextApiResponse } from "next";
import { PrismaService } from "@/node/prisma/prisma.service";

interface DataResponse {
  Enfermedad: string;
  Tratamiento: string[];
  Síntoma: string[];
  Diagnostico: string[];
  Sintomas_tempranos: string[];
  Sintomas_avanzados: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await HandlerDiseasesId(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}
const HandlerDiseasesId = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string };

  const prismaService = new PrismaService();

  const disaeses = await prismaService.disaeses.findFirst({
    where: { id_disease: Number(id) },
    include: {
      disaeses_advanced_symptoms: {
        include: {
          advanced_symptoms: true,
          disaeses: true,
        },
      },
      disaeses_diagnosis: {
        include: {
          diagnosis: true,
          disaeses: true,
        },
      },
      disaeses_early_symptoms: {
        include: {
          early_symptoms: true,
          disaeses: true,
        },
      },
      disaeses_symptom: {
        include: {
          symptom: true,
          disaeses: true,
        },
      },
      disaeses_treatment: {
        include: {
          treatment: true,
          disaeses: true,
        },
      },
    },
  });

  const image = await prismaService.images.findFirst({
    where: {
      externalId: `disaeses_${id}`,
    },
  });

  if (!disaeses) {
    return res.status(404).json({
      message: "No existe registro de enfermedades",
      data: undefined,
    });
  }
  return res.status(200).json({
    message: "Enfermedades encontradas",
    data: {
      image,
      ...transform(disaeses),
    },
  });
};

const transform = (data: any): DataResponse => {
  const result = {
    Enfermedad: data.name,
    Tratamiento: [],
    Síntoma: [],
    Diagnostico: [],
    Sintomas_tempranos: [],
    Sintomas_avanzados: [],
  } as DataResponse;

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        if (item.treatment) {
          if (!result.Tratamiento.includes(item.treatment.name)) {
            result.Tratamiento.push(item.treatment.name);
          }
        }
        if (item.symptom) {
          if (!result.Síntoma.includes(item.symptom.name)) {
            result.Síntoma.push(item.symptom.name);
          }
        }
        if (item.diagnosis) {
          if (!result.Diagnostico.includes(item.diagnosis.name)) {
            result.Diagnostico.push(item.diagnosis.name);
          }
        }
        if (item.early_symptoms) {
          if (!result.Sintomas_tempranos.includes(item.early_symptoms.name)) {
            result.Sintomas_tempranos.push(item.early_symptoms.name);
          }
        }
        if (item.advanced_symptoms) {
          if (
            !result.Sintomas_avanzados.includes(item.advanced_symptoms.name)
          ) {
            result.Sintomas_avanzados.push(item.advanced_symptoms.name);
          }
        }
      });
    }
  });

  return result as DataResponse;
};

import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/node/config/db";

interface DataResponse {
  Enfermedad: string;
  Tratamiento: string[];
  Síntoma: string[];
  Diagnostico: string[];
  Sintomas_tempranos: string[];
  Sintomas_avanzados: string[];
}

interface DataResult {
  Enfermedad: string;
  Tratamiento?: string;
  Síntoma?: string;
  Diagnostico?: string;
  Sintomas_tempranos?: string;
  Sintomas_avanzados?: string;
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
  const { id } = req.query;
  const result = (await pool.query(
    `select d.name as Enfermedad, t.name as Tratamiento, s.name as Síntoma, d2.name as Diagnostico, es.name as "Sintomas_tempranos", as2.name as "Sintomas_avanzados"
        from disaeses d
            left join disaeses_treatment dt ON d.id_disease = dt.id_disease  left join treatment t on dt.id_treatment = t.id_treatment
            left join disaeses_symptom ds ON d.id_disease = ds.id_disease  left join symptom s on ds.id_symptom = s.id_symptom
            left join disaeses_diagnosis dd ON d.id_disease  = dd.id_disease  left join diagnosis d2 on dd.id_diagnosis = d2.id_diagnosis
            left join disaeses_early_symptoms des ON d.id_disease = des.id_disease left join early_symptoms es on des.id_early_symptoms = es.id_early_symptoms
            left join disaeses_advanced_symptoms das ON d.id_disease = das.id_disease left join advanced_symptoms as2 on das.id_advanced_symptoms = as2.id_advanced_symptoms 
            where d.id_disease = ? `,
    [id]
  )) as DataResult[];
  const image = (await pool.query(
    `select url from images where externalId = ?`,
    [`disaeses_` + id]
  )) as any;
  if (result.length === 0) {
    return res.status(404).json({
      message: "No existe registro de enfermedades",
      data: undefined,
    });
  }
  return res.status(200).json({
    message: "Enfermedades encontradas",
    data: {
      image: image[0].url,
      ...transform(result),
    },
  });
};

const transform = (data: DataResult[]): DataResponse => {
  const result = {
    Enfermedad: data[0].Enfermedad,
    Tratamiento: [],
    Síntoma: [],
    Diagnostico: [],
    Sintomas_tempranos: [],
    Sintomas_avanzados: [],
  } as DataResponse;
  data.forEach((item) => {
    if (item.Tratamiento) {
      if (!result.Tratamiento.includes(item.Tratamiento)) {
        result.Tratamiento.push(item.Tratamiento);
      }
    }
    if (item.Síntoma) {
      if (!result.Síntoma.includes(item.Síntoma)) {
        result.Síntoma.push(item.Síntoma);
      }
    }
    if (item.Diagnostico) {
      if (!result.Diagnostico.includes(item.Diagnostico)) {
        result.Diagnostico.push(item.Diagnostico);
      }
    }
    if (item.Sintomas_tempranos) {
      if (!result.Sintomas_tempranos.includes(item.Sintomas_tempranos)) {
        result.Sintomas_tempranos.push(item.Sintomas_tempranos);
      }
    }
    if (item.Sintomas_avanzados) {
      if (!result.Sintomas_avanzados.includes(item.Sintomas_avanzados)) {
        result.Sintomas_avanzados.push(item.Sintomas_avanzados);
      }
    }
  });

  return result as DataResponse;
};

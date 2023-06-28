import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { usersSeed } from "./seeds/users.seed";
import { parallelSeed } from "./seeds/parallel.seed";
import { parallel_userSeed } from "./seeds/parallel_user.seed";
import { disaesesSeed } from "./seeds/disaeses.seed";
import { symptomSeed } from "./seeds/symptom.seed";
import { diagnosisSeed } from "./seeds/diagnosis.seed";
import { treatmentSeed } from "./seeds/treatment.seed";
import { advanced_symptomsSeed } from "./seeds/advanced_symptoms.seed";
import { early_symptomsSeed } from "./seeds/early_symptoms.seed";
import { disaeses_early_symptomsSeed } from "./seeds/disaeses_early_symptoms.seed";
import { disaeses_advanced_symptomsSeed } from "./seeds/disaeses_advanced_symptoms.seed";
import { disaeses_symptomSeed } from "./seeds/disaeses_symptom.seed";
import { disaeses_treatmentSeed } from "./seeds/disaeses_treatment.seed";
import { disaeses_diagnosisSeed } from "./seeds/disaeses_diagnosis.seed";
import { imagesSeed } from "./seeds/images.seed";
import { techniqueSeed } from "./seeds/technique.seed";

async function main() {
  console.log(await usersSeed());
  console.log(await parallelSeed());
  console.log(await parallel_userSeed());
  console.log(await disaesesSeed());
  console.log(await symptomSeed());
  console.log(await diagnosisSeed());
  console.log(await treatmentSeed());
  console.log(await advanced_symptomsSeed());
  console.log(await early_symptomsSeed());
  console.log(await disaeses_early_symptomsSeed());
  console.log(await disaeses_advanced_symptomsSeed());
  console.log(await disaeses_symptomSeed());
  console.log(await disaeses_treatmentSeed());
  console.log(await disaeses_diagnosisSeed());
  console.log(await imagesSeed());
  console.log(await techniqueSeed());
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

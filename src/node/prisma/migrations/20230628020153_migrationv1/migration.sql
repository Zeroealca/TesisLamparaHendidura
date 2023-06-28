-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "recovery_token" TEXT,
    "rol" TEXT NOT NULL DEFAULT 'ESTUDIANTE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parallel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parallel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parallel_user" (
    "id" SERIAL NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_parallel" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parallel_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technique" (
    "id_technique" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "magnification" TEXT NOT NULL,
    "lightingAngle" TEXT NOT NULL,
    "imageNormal" TEXT NOT NULL,
    "imageTechnique" TEXT NOT NULL,
    "assess" TEXT NOT NULL,

    CONSTRAINT "technique_pkey" PRIMARY KEY ("id_technique")
);

-- CreateTable
CREATE TABLE "images" (
    "id_image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT,
    "state" TEXT,
    "externalId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id_image")
);

-- CreateTable
CREATE TABLE "comments" (
    "id_comment" SERIAL NOT NULL,
    "id_image" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id_comment")
);

-- CreateTable
CREATE TABLE "disaeses" (
    "id_disease" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "disaeses_pkey" PRIMARY KEY ("id_disease")
);

-- CreateTable
CREATE TABLE "symptom" (
    "id_symptom" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "symptom_pkey" PRIMARY KEY ("id_symptom")
);

-- CreateTable
CREATE TABLE "advanced_symptoms" (
    "id_advanced_symptoms" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "advanced_symptoms_pkey" PRIMARY KEY ("id_advanced_symptoms")
);

-- CreateTable
CREATE TABLE "early_symptoms" (
    "id_early_symptoms" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "early_symptoms_pkey" PRIMARY KEY ("id_early_symptoms")
);

-- CreateTable
CREATE TABLE "treatment" (
    "id_treatment" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "treatment_pkey" PRIMARY KEY ("id_treatment")
);

-- CreateTable
CREATE TABLE "diagnosis" (
    "id_diagnosis" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "diagnosis_pkey" PRIMARY KEY ("id_diagnosis")
);

-- CreateTable
CREATE TABLE "disaeses_symptom" (
    "id_disease" INTEGER NOT NULL,
    "id_symptom" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disaeses_symptom_pkey" PRIMARY KEY ("id_disease","id_symptom")
);

-- CreateTable
CREATE TABLE "disaeses_advanced_symptoms" (
    "id_disease" INTEGER NOT NULL,
    "id_advanced_symptoms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disaeses_advanced_symptoms_pkey" PRIMARY KEY ("id_disease","id_advanced_symptoms")
);

-- CreateTable
CREATE TABLE "disaeses_early_symptoms" (
    "id_disease" INTEGER NOT NULL,
    "id_early_symptoms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disaeses_early_symptoms_pkey" PRIMARY KEY ("id_disease","id_early_symptoms")
);

-- CreateTable
CREATE TABLE "disaeses_treatment" (
    "id_disease" INTEGER NOT NULL,
    "id_treatment" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disaeses_treatment_pkey" PRIMARY KEY ("id_disease","id_treatment")
);

-- CreateTable
CREATE TABLE "disaeses_diagnosis" (
    "id_disease" INTEGER NOT NULL,
    "id_diagnosis" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disaeses_diagnosis_pkey" PRIMARY KEY ("id_disease","id_diagnosis")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "parallel_user" ADD CONSTRAINT "parallel_user_id_parallel_fkey" FOREIGN KEY ("id_parallel") REFERENCES "parallel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parallel_user" ADD CONSTRAINT "parallel_user_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_image_fkey" FOREIGN KEY ("id_image") REFERENCES "images"("id_image") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disaeses_symptom" ADD CONSTRAINT "disaeses_symptom_id_disease_fkey" FOREIGN KEY ("id_disease") REFERENCES "disaeses"("id_disease") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disaeses_symptom" ADD CONSTRAINT "disaeses_symptom_id_symptom_fkey" FOREIGN KEY ("id_symptom") REFERENCES "symptom"("id_symptom") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disaeses_advanced_symptoms" ADD CONSTRAINT "disaeses_advanced_symptoms_id_disease_fkey" FOREIGN KEY ("id_disease") REFERENCES "disaeses"("id_disease") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disaeses_advanced_symptoms" ADD CONSTRAINT "disaeses_advanced_symptoms_id_advanced_symptoms_fkey" FOREIGN KEY ("id_advanced_symptoms") REFERENCES "advanced_symptoms"("id_advanced_symptoms") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disaeses_early_symptoms" ADD CONSTRAINT "disaeses_early_symptoms_id_disease_fkey" FOREIGN KEY ("id_disease") REFERENCES "disaeses"("id_disease") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disaeses_early_symptoms" ADD CONSTRAINT "disaeses_early_symptoms_id_early_symptoms_fkey" FOREIGN KEY ("id_early_symptoms") REFERENCES "early_symptoms"("id_early_symptoms") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disaeses_treatment" ADD CONSTRAINT "disaeses_treatment_id_disease_fkey" FOREIGN KEY ("id_disease") REFERENCES "disaeses"("id_disease") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disaeses_treatment" ADD CONSTRAINT "disaeses_treatment_id_treatment_fkey" FOREIGN KEY ("id_treatment") REFERENCES "treatment"("id_treatment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disaeses_diagnosis" ADD CONSTRAINT "disaeses_diagnosis_id_disease_fkey" FOREIGN KEY ("id_disease") REFERENCES "disaeses"("id_disease") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disaeses_diagnosis" ADD CONSTRAINT "disaeses_diagnosis_id_diagnosis_fkey" FOREIGN KEY ("id_diagnosis") REFERENCES "diagnosis"("id_diagnosis") ON DELETE RESTRICT ON UPDATE CASCADE;

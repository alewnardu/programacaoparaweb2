/*
  Warnings:

  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `modules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `courses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `modules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "courses" DROP CONSTRAINT "courses_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "courses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "modules" DROP CONSTRAINT "modules_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "modules_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "couses_modules" (
    "course_id" UUID NOT NULL,
    "module_id" UUID NOT NULL,

    CONSTRAINT "couses_modules_pkey" PRIMARY KEY ("course_id","module_id")
);

-- AddForeignKey
ALTER TABLE "couses_modules" ADD CONSTRAINT "couses_modules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "couses_modules" ADD CONSTRAINT "couses_modules_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

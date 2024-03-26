-- AddMinutesColumn
PRAGMA foreign_keys=OFF;

-- Add the `minutes` column to the existing `Recipe` table
ALTER TABLE "Recipe" ADD COLUMN "minutes" INTEGER NOT NULL DEFAULT 0;

PRAGMA foreign_keys=ON;

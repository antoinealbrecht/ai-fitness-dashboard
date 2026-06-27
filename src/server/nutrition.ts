"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export async function createNutritionEntry(formData: FormData) {
  const calories = Number(formData.get("calories"));
  const protein = Number(formData.get("protein"));
  const carbs = Number(formData.get("carbs"));
  const fat = Number(formData.get("fat"));
  const adherence = Number(formData.get("adherence"));
  const notes = String(formData.get("notes") || "");

  await prisma.nutritionEntry.create({
    data: {
      calories,
      protein,
      carbs,
      fat,
      adherence,
      notes,
    },
  });

  revalidatePath("/nutrition");
}
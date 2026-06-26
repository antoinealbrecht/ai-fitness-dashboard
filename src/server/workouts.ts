"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export async function createWorkout(formData: FormData) {
  const name = String(formData.get("name"));

  await prisma.workout.create({
    data: {
      name,
    },
  });

  revalidatePath("/workouts");
}
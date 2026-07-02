"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRecoveryEntry(formData: FormData) {
  const sleepHours = Number(formData.get("sleepHours"));
  const sleepQuality = Number(formData.get("sleepQuality"));
  const fatigue = Number(formData.get("fatigue"));
  const soreness = Number(formData.get("soreness"));
  const stress = Number(formData.get("stress"));
  const notes = String(formData.get("notes") || "");

  await prisma.recoveryEntry.create({
    data: {
      sleepHours,
      sleepQuality,
      fatigue,
      soreness,
      stress,
      notes,
    },
  });

  revalidatePath("/recovery");
}
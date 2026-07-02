"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export async function createRecoveryEntry(formData: FormData) {
  const sleepHours = Number(formData.get("sleepHours"));
  const sleepQuality = Number(formData.get("sleepQuality"));
  const notes = String(formData.get("notes") || "");

  await prisma.recoveryEntry.create({
    data: {
      sleepHours,
      sleepQuality,
      notes,
    },
  });

  revalidatePath("/recovery");
}
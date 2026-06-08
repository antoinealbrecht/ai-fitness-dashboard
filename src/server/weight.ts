"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export async function createWeightEntry(weightLb: number) {
  await prisma.bodyWeightEntry.create({
    data: {
      weightLb,
    },
  });

  revalidatePath("/weight");
}
"use server";

import { prisma } from "../lib/prisma";

export async function createWeightEntry(weightLb: number) {
  await prisma.bodyWeightEntry.create({
    data: {
      weightLb,
    },
  });
}
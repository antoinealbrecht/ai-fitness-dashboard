import { createWeightEntry } from "../../src/server/weight";

export default function WeightPage() {
  async function saveWeight(formData: FormData) {
    "use server";

    const weight = Number(formData.get("weight"));

    await createWeightEntry(weight);
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <h1 className="text-3xl font-bold">Log Body Weight</h1>

      <form action={saveWeight} className="mt-6 flex gap-4">
        <input
          name="weight"
          type="number"
          step="0.1"
          placeholder="Weight (lb)"
          className="rounded-lg bg-zinc-800 px-4 py-2"
        />

        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2">
          Save
        </button>
      </form>
    </main>
  );
}
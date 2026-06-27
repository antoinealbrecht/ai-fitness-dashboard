import { prisma } from "../../src/lib/prisma";
import { createNutritionEntry } from "../../src/server/nutrition";

export default async function NutritionPage() {
  const entries = await prisma.nutritionEntry.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const latest = entries[0];

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Nutrition</h1>
        <p className="mt-2 text-zinc-400">
          Track simple daily nutrition targets that support hypertrophy.
        </p>

        <form action={createNutritionEntry} className="mt-6 grid gap-3 md:grid-cols-6">
          <input name="calories" type="number" placeholder="Calories" className="rounded-lg bg-zinc-800 px-3 py-2 outline-none" required />
          <input name="protein" type="number" placeholder="Protein" className="rounded-lg bg-zinc-800 px-3 py-2 outline-none" required />
          <input name="carbs" type="number" placeholder="Carbs" className="rounded-lg bg-zinc-800 px-3 py-2 outline-none" required />
          <input name="fat" type="number" placeholder="Fat" className="rounded-lg bg-zinc-800 px-3 py-2 outline-none" required />
          <input name="adherence" type="number" min="1" max="5" placeholder="Adherence 1-5" className="rounded-lg bg-zinc-800 px-3 py-2 outline-none" required />

          <button type="submit" className="rounded-lg bg-blue-600 px-3 py-2">
            Save
          </button>

          <textarea
            name="notes"
            placeholder="Notes"
            className="md:col-span-6 rounded-lg bg-zinc-800 px-3 py-2 outline-none"
          />
        </form>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Calories</p>
            <p className="mt-2 text-3xl font-bold">{latest?.calories ?? "--"}</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Protein</p>
            <p className="mt-2 text-3xl font-bold">
              {latest ? `${latest.protein}g` : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Carbs</p>
            <p className="mt-2 text-3xl font-bold">
              {latest ? `${latest.carbs}g` : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Fat</p>
            <p className="mt-2 text-3xl font-bold">
              {latest ? `${latest.fat}g` : "--"}
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Nutrition History</h2>

          <div className="mt-4 space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <p className="font-semibold">
                  {entry.calories} cal · {entry.protein}g protein · adherence {entry.adherence}/5
                </p>
                <p className="text-sm text-zinc-400">
                  {entry.date.toLocaleDateString()}
                </p>
                {entry.notes && (
                  <p className="mt-2 text-sm text-zinc-400">{entry.notes}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
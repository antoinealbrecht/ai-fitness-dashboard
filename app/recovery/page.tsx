import { prisma } from "../../src/lib/prisma";
import { createRecoveryEntry } from "../../src/server/recovery";

export default async function RecoveryPage() {
  const entries = await prisma.recoveryEntry.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const latest = entries[0];

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Recovery</h1>
        <p className="mt-2 text-zinc-400">
          Track simple sleep signals that support hypertrophy.
        </p>

        <form
          action={createRecoveryEntry}
          className="mt-6 grid gap-3 md:grid-cols-3"
        >
          <input
            name="sleepHours"
            type="number"
            step="0.1"
            placeholder="Sleep hours"
            className="rounded-lg bg-zinc-800 px-3 py-2 outline-none"
            required
          />

          <input
            name="sleepQuality"
            type="number"
            min="1"
            max="5"
            placeholder="Sleep quality 1-5"
            className="rounded-lg bg-zinc-800 px-3 py-2 outline-none"
            required
          />

          <button type="submit" className="rounded-lg bg-blue-600 px-3 py-2">
            Save
          </button>

          <textarea
            name="notes"
            placeholder="Notes"
            className="rounded-lg bg-zinc-800 px-3 py-2 outline-none md:col-span-3"
          />
        </form>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Sleep</p>
            <p className="mt-2 text-3xl font-bold">
              {latest ? `${latest.sleepHours}h` : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Sleep Quality</p>
            <p className="mt-2 text-3xl font-bold">
              {latest ? `${latest.sleepQuality}/5` : "--"}
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Recovery History</h2>

          <div className="mt-4 space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <p className="font-semibold">
                  {entry.sleepHours}h sleep · quality {entry.sleepQuality}/5
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
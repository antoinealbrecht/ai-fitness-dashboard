import { WeightChart } from "../../src/components/WeightChart";
import { prisma } from "../../src/lib/prisma";
import {
  createWeightEntry,
  deleteWeightEntry,
} from "../../src/server/weight";

export default async function WeightPage() {
  async function saveWeight(formData: FormData) {
    "use server";

    const weight = Number(formData.get("weight"));

    await createWeightEntry(weight);
  }

  const entries = await prisma.bodyWeightEntry.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const chartData = entries
    .slice()
    .reverse()
    .map((entry) => ({
      date: entry.date.toLocaleDateString(),
      weight: entry.weightLb,
    }));

  const currentWeight = entries[0]?.weightLb;
  const goalWeight = 170;

  const weights = entries.map((entry) => entry.weightLb);

  const highestWeight = weights.length > 0 ? Math.max(...weights) : null;
  const lowestWeight = weights.length > 0 ? Math.min(...weights) : null;
  const oldestWeight = entries[entries.length - 1]?.weightLb;

  const totalChange =
    currentWeight && oldestWeight ? currentWeight - oldestWeight : null;

  const distanceFromGoal = currentWeight ? currentWeight - goalWeight : null;

  const sevenDayEntries = entries.slice(0, 7);

  const sevenDayAverage =
    sevenDayEntries.length > 0
      ? sevenDayEntries.reduce((sum, entry) => sum + entry.weightLb, 0) /
        sevenDayEntries.length
      : null;

  const oldestRecentWeight =
    sevenDayEntries[sevenDayEntries.length - 1]?.weightLb;

  const trend =
    currentWeight && oldestRecentWeight
      ? currentWeight - oldestRecentWeight
      : null;

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Body Weight</h1>
        <p className="mt-2 text-zinc-400">
          Log your weigh-ins and track your trend over time.
        </p>

        <form action={saveWeight} className="mt-6 flex gap-4">
          <input
            name="weight"
            type="number"
            step="0.1"
            placeholder="Weight (lb)"
            className="rounded-lg bg-zinc-800 px-4 py-2 text-white outline-none"
            required
          />

          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2">
            Save
          </button>
        </form>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Current Weight</p>
            <p className="mt-2 text-3xl font-bold">
              {currentWeight ? `${currentWeight} lb` : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">7-Entry Average</p>
            <p className="mt-2 text-3xl font-bold">
              {sevenDayAverage ? `${sevenDayAverage.toFixed(1)} lb` : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Recent Trend</p>
            <p className="mt-2 text-3xl font-bold">
              {trend !== null ? `${trend.toFixed(1)} lb` : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Goal Weight</p>
            <p className="mt-2 text-3xl font-bold">{goalWeight} lb</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">From Goal</p>
            <p className="mt-2 text-3xl font-bold">
              {distanceFromGoal !== null
                ? `${distanceFromGoal.toFixed(1)} lb`
                : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Total Change</p>
            <p className="mt-2 text-3xl font-bold">
              {totalChange !== null ? `${totalChange.toFixed(1)} lb` : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Highest Logged</p>
            <p className="mt-2 text-3xl font-bold">
              {highestWeight !== null ? `${highestWeight} lb` : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Lowest Logged</p>
            <p className="mt-2 text-3xl font-bold">
              {lowestWeight !== null ? `${lowestWeight} lb` : "--"}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <WeightChart data={chartData} />
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Weight History</h2>

          <div className="mt-4 space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <p className="text-lg font-semibold">{entry.weightLb} lb</p>

                <p className="text-sm text-zinc-400">
                  {entry.date.toLocaleDateString()}
                </p>

                <form
                  action={async () => {
                    "use server";
                    await deleteWeightEntry(entry.id);
                  }}
                >
                  <button
                    type="submit"
                    className="mt-3 rounded-lg bg-red-600 px-3 py-1 text-sm"
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
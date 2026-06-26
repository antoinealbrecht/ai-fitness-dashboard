import { prisma } from "../../src/lib/prisma";
import { createWorkout } from "../../src/server/workouts";

export default async function WorkoutsPage() {
  const workouts = await prisma.workout.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Workouts</h1>
        <p className="mt-2 text-zinc-400">
          Log training sessions and build toward mesocycle tracking.
        </p>

        <form action={createWorkout} className="mt-6 flex gap-4">
          <input
            name="name"
            type="text"
            placeholder="Workout name, ex: Push Day"
            className="rounded-lg bg-zinc-800 px-4 py-2 text-white outline-none"
            required
          />

          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2">
            Save
          </button>
        </form>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Workout History</h2>

          <div className="mt-4 space-y-3">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <p className="text-lg font-semibold">{workout.name}</p>
                <p className="text-sm text-zinc-400">
                  {workout.date.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
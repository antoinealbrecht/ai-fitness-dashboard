import Link from "next/link";
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
          Create workouts and open them to log exercises, sets, reps, and RIR.
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
            Create Workout
          </button>
        </form>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Workout History</h2>

          <div className="mt-4 space-y-3">
            {workouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="block rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:bg-zinc-800"
              >
                <p className="text-lg font-semibold">{workout.name}</p>
                <p className="text-sm text-zinc-400">
                  {workout.date.toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../src/lib/prisma";
import {
  addExerciseSet,
  deleteExerciseSet,
} from "../../../src/server/workouts";

type WorkoutDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;
  const workoutId = Number(id);

  const workout = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
    include: {
      exercises: {
        include: {
          exercise: true,
          sets: {
            orderBy: {
              id: "asc",
            },
          },
        },
      },
    },
  });

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <section className="mx-auto max-w-5xl">
        <Link href="/workouts" className="text-sm text-blue-400">
          ← Back to workouts
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold">{workout.name}</h1>
          <p className="mt-2 text-zinc-400">
            {workout.date.toLocaleDateString()}
          </p>
        </div>

        <form action={addExerciseSet} className="mt-8 grid gap-3 md:grid-cols-6">
          <input type="hidden" name="workoutId" value={workout.id} />

          <input
            name="exerciseName"
            placeholder="Exercise"
            className="rounded-lg bg-zinc-800 px-3 py-2 text-white outline-none"
            required
          />

          <input
            name="muscleGroup"
            placeholder="Muscle group"
            className="rounded-lg bg-zinc-800 px-3 py-2 text-white outline-none"
            required
          />

          <input
            name="weight"
            type="number"
            step="0.5"
            placeholder="Weight"
            className="rounded-lg bg-zinc-800 px-3 py-2 text-white outline-none"
            required
          />

          <input
            name="reps"
            type="number"
            placeholder="Reps"
            className="rounded-lg bg-zinc-800 px-3 py-2 text-white outline-none"
            required
          />

          <input
            name="rir"
            type="number"
            step="0.5"
            placeholder="RIR"
            className="rounded-lg bg-zinc-800 px-3 py-2 text-white outline-none"
            required
          />

          <button type="submit" className="rounded-lg bg-blue-600 px-3 py-2">
            Add Set
          </button>
        </form>

        <section className="mt-10 space-y-4">
          {workout.exercises.map((workoutExercise) => {
            const totalVolume = workoutExercise.sets.reduce(
              (sum, set) => sum + set.weight * set.reps,
              0
            );

            return (
              <div
                key={workoutExercise.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <p className="text-lg font-semibold">
                  {workoutExercise.exercise.name}
                </p>

                <p className="text-sm text-zinc-500">
                  {workoutExercise.exercise.muscleGroup}
                </p>

                <div className="mt-4 space-y-2">
                  {workoutExercise.sets.map((set, index) => (
                    <div
                      key={set.id}
                      className="flex items-center justify-between rounded-lg bg-zinc-950 px-4 py-2 text-sm text-zinc-300"
                    >
                      <p>
                        Set {index + 1}: {set.weight} lb × {set.reps} reps @{" "}
                        {set.rir} RIR
                      </p>

                      <form
                        action={async () => {
                          "use server";
                          await deleteExerciseSet(set.id, workout.id);
                        }}
                      >
                        <button type="submit" className="text-red-400">
                          Delete
                        </button>
                      </form>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm text-zinc-400">
                  Volume: {totalVolume.toLocaleString()} lb
                </p>
              </div>
            );
          })}
        </section>
      </section>
    </main>
  );
}
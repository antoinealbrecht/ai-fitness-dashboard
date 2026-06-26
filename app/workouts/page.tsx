import { prisma } from "../../src/lib/prisma";
import {
  addExerciseSet,
  createWorkout,
  deleteExerciseSet,
} from "../../src/server/workouts";

export default async function WorkoutsPage() {
  const workouts = await prisma.workout.findMany({
    orderBy: {
      date: "desc",
    },
    include: {
      exercises: {
        include: {
          exercise: true,
          sets: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Workouts</h1>
        <p className="mt-2 text-zinc-400">
          Log training sessions, exercises, sets, reps, and RIR.
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
            Save Workout
          </button>
        </form>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Workout History</h2>

          <div className="mt-4 space-y-6">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <p className="text-xl font-semibold">{workout.name}</p>
                <p className="text-sm text-zinc-400">
                  {workout.date.toLocaleDateString()}
                </p>

                <form action={addExerciseSet} className="mt-5 grid gap-3 md:grid-cols-6">
                  <input type="hidden" name="workoutId" value={workout.id} />
                  
                  <input
                  name="muscleGroup"
                  placeholder="Muscle group"
                  className="rounded-lg bg-zinc-800 px-3 py-2 text-white outline-none"
                  required
                  />  

                  <input
                    name="exerciseName"
                    placeholder="Exercise"
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

                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-3 py-2"
                  >
                    Add Set
                  </button>
                </form>

                <div className="mt-5 space-y-3">
                  {workout.exercises.map((workoutExercise) => (
                      <div
                      key={workoutExercise.id}
                      className="rounded-lg border border-zinc-800 bg-zinc-950 p-4"
                    >
                      <p className="font-semibold">
                      {workoutExercise.exercise.name}
                      </p>
                      <p className="text-sm text-zinc-500">
                      {workoutExercise.exercise.muscleGroup}
                      </p>

                      <div className="mt-2 space-y-1">
                        {workoutExercise.sets.map((set) => (
                        <div
                            key={set.id}
                            className="flex items-center justify-between text-sm text-zinc-400"
                        >
                            <p>
                            {set.weight} lb × {set.reps} reps @ {set.rir} RIR
                            </p>

                            <form
                            action={async () => {
                                "use server";
                                await deleteExerciseSet(set.id);
                            }}
                            >
                            <button type="submit" className="text-red-400">
                                Delete
                            </button>
                            </form>
                        </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
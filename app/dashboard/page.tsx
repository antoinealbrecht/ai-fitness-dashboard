export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-zinc-400">
          Your fitness data overview will go here.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Body Weight</p>
            <p className="mt-2 text-2xl font-bold">-- lb</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Calories</p>
            <p className="mt-2 text-2xl font-bold">--</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Sleep</p>
            <p className="mt-2 text-2xl font-bold">-- hrs</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Workouts</p>
            <p className="mt-2 text-2xl font-bold">--</p>
          </div>
        </div>
      </section>
    </main>
  );
}
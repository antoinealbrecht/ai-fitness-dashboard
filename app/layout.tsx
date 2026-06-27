import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hypertrophy Dashboard",
  description: "Evidence-based hypertrophy training dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-950 text-white">
        <div className="flex min-h-screen">
          <aside className="hidden w-64 border-r border-zinc-800 bg-zinc-950 p-6 md:block">
            <h1 className="text-xl font-bold">Hypertrophy</h1>

            <nav className="mt-8 space-y-2">
              <Link
                href="/dashboard"
                className="block rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/workouts"
                className="block rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
              >
                Workouts
              </Link>

              <Link
              href="/nutrition"
              className="block rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
              >
              Nutrition
              </Link>

              <Link
                href="/weight"
                className="block rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
              >
                Weight
              </Link>

              <Link
                href="/analytics"
                className="block rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
              >
                Analytics
              </Link>

              <Link
                href="/settings"
                className="block rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
              >
                Settings
              </Link>
            </nav>
          </aside>

          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
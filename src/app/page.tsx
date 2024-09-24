import { CheckCircle, GithubIcon } from "lucide-react";
import Link from "next/link";
import { SignupBtn } from "@/components/signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";

export default async function LandingPage() {
  const session = await getServerSession();
  if (session?.user) redirect("/todo");
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Organize your work and life, finally.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Become focused, organized, and calm with TaskMaster. The
                  world&apos;s #1 task manager and to-do list app.
                </p>
              </div>
              <div className="bg-slate-700 p-2 text-white rounded-3xl hover:bg-slate-950 dark:bg-slate-500 dark:text-black">
                <SignupBtn>Start for free</SignupBtn>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Achieve peace of mind with TaskMaster
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">
                  Get clarity on your tasks
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Add your tasks. Organize them into projects. Add due dates,
                  recurring dates, priorities, and more.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Reach your goals</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Everything you need to achieve your goals in one place,
                  instantly searchable.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Conquer your day</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Plan your day with Today and Upcoming views. See your progress
                  with clean UI and confetti on completion!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2023 TaskMaster, Inc. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <span>
                <Link
                  href="https://auenkr.me"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:underline px-2"
                >
                  Made by{" "}
                  <span className="text-black font-bold">Golden Kumar</span>
                </Link>
              </span>
              <Link
                href="https://github.com/AuenKr/todo"
                className="text-sm dark:text-gray-400 hover:underline"
              >
                <span className="flex justify-center items-center space-x-2">
                  <GithubIcon /> Source Code
                </span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

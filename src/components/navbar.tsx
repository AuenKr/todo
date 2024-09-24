import { Menu } from "lucide-react";
import Image from "next/image";
import { SignupBtn } from "./signup";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="container flex h-14 max-w-screen-2xl items-center dark:bg-black dark:text-white">
      <div className="mr-4 hidden md:flex">
        <Link className="mr-6 flex items-center space-x-2" href="/">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <span className="hidden font-bold sm:inline-block">TaskMaster</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="#features">Features</Link>
        </nav>
      </div>
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <nav className="w-full flex justify-between items-center mx-1 space-x-2 md:justify-end">
          <Link
            href="/api/auth/signin"
            className="bg-slate-700 p-2 text-white rounded-3xl hover:bg-slate-950 dark:bg-slate-500 dark:text-black"
          >
            Log in
          </Link>
          <div className="bg-slate-700 p-2 text-white rounded-3xl hover:bg-slate-950 dark:bg-slate-500 dark:text-black">
            <SignupBtn>Start for free</SignupBtn>
          </div>
        </nav>
      </div>
    </div>
  );
}

"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

export function SignoutBtn() {
  return (
    <div
      onClick={() => {
        localStorage.clear();
        signOut();
        redirect("/");
      }}
      className="space-x-1 hover:bg-gray-700 w-full m-1 border-2 rounded-xl hover:cursor-pointer"
    >
      <div className="flex p-2 space-x-2 justify-center items-center">
        <span>
          <LogOut />
        </span>
        <span className="hidden md:block">Sign Out</span>
      </div>
    </div>
  );
}

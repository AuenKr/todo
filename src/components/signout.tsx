"use client";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

export function SignoutBtn({ children }: { children: ReactNode }) {
  return (
    <Button
      onClick={() => {
        localStorage.clear();
        signOut();
        redirect("/");
      }}
      className="space-x-1 hover:bg-gray-700 w-full m-1 border-2 rounded-xl"
    >
      <div className="flex p-2 space-x-2">
        <span>
          <LogOut />
        </span>
        <span className="hidden md:block">{children}</span>
      </div>
    </Button>
  );
}

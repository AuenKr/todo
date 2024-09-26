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
        signOut();
        redirect("/");
      }}
      className="space-x-1 p-0 md:p-1 hover:bg-gray-700 w-full"
    >
      <LogOut />
      <span className="hidden md:block">{children}</span>
    </Button>
  );
}

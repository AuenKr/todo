"use client";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export function SignoutBtn({ children }: { children: ReactNode }) {
  return (
    <>
      <Button
        onClick={() => {
          signOut();
          redirect("/");
        }}
      >
        {children}
      </Button>
    </>
  );
}

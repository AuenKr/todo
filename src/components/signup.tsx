import { ReactNode } from "react";
import Link from "next/link";

export function SignupBtn({ children }: { children: ReactNode }) {
  return (
    <>
      <Link href="/auth/signup">{children}</Link>
    </>
  );
}

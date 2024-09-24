import { Todo } from "@/components/todo/todo";
import { Sidebar } from "@/components/todo/sidebar";
import { useRecoilValue } from "recoil";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function TodoPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/");
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white p-4">
        <Sidebar />
      </div>
      <div className="w-full">
        <Todo />
      </div>
    </div>
  );
}

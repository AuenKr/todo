"use client";
import { useLabel } from "@/hooks/useLabel";
import { Inbox, Menu } from "lucide-react";
import { CreateLabel } from "./createLabel";
import { useRecoilState } from "recoil";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { Skeleton } from "../ui/skeleton";
import { SignoutBtn } from "../signout";

export function Sidebar() {
  const { loading, labels } = useLabel();
  const [activeLabel, setActiveLabel] = useRecoilState(activeLabelAtom);
  const skeletonArray = [1, 2, 3, 4];
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex space-x-2">
          <h1 className="hidden md:block text-2xl font-bold mb-4">Todo app</h1>
        </div>
        {loading ? (
          <div className="space-y-2">
            {skeletonArray.map((each) => {
              return (
                <Skeleton
                  key={each}
                  className="w-full h-[40px] rounded-xl bg-slate-600"
                />
              );
            })}
          </div>
        ) : (
          <ul>
            {labels?.map((project) => (
              <li
                key={project.id}
                className={`mb-2 p-2 rounded cursor-pointer ${
                  activeLabel?.name === project.name ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveLabel(project)}
              >
                <div className="flex space-x-2">
                  {project.name === "Inbox" ? (
                    <Inbox className="inline-block" />
                  ) : (
                    <Menu className="inline-block" />
                  )}
                  <span className="hidden md:block">{project.name}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="space-y-5">
        <div className="border-2 rounded-xl">
          <CreateLabel />
        </div>
        <div className="text-center border-2 rounded-xl hover:bg-gray-700">
          <SignoutBtn>Signout</SignoutBtn>
        </div>
      </div>
    </div>
  );
}

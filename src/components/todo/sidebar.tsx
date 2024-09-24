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
        <h1 className="text-2xl font-bold mb-4">Todo app</h1>
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
                {project.name === "Inbox" ? (
                  <Inbox className="inline-block mr-2" />
                ) : (
                  <Menu className="inline-block mr-2" />
                )}
                {project.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <div className="border-2 rounded-xl">
          <CreateLabel />
        </div>
        <div className="text-center border-2 rounded-xl mt-5">
          <SignoutBtn>Signout</SignoutBtn>
        </div>
      </div>
    </div>
  );
}

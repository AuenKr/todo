"use client";
import { useLabel } from "@/hooks/useLabel";
import { Edit, Inbox, Menu } from "lucide-react";
import { CreateLabel } from "./createLabel";
import { useRecoilState } from "recoil";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { Skeleton } from "../ui/skeleton";
import { SignoutBtn } from "../signout";
import { EditLabel } from "./editLabel";
import { useState } from "react";

export function Sidebar() {
  const { loading, labels } = useLabel();
  const [activeLabel, setActiveLabel] = useRecoilState(activeLabelAtom);
  const [editMode, setEditMode] = useState<boolean>(false);
  const skeletonArray = [1, 2, 3, 4];
  return (
    <div className="flex flex-col justify-between min-h-full overflow-x-hidden">
      <div>
        <div className="flex space-x-2">
          <h1 className="w-full hidden md:block text-2xl font-bold mb-4 justify-between">
            <div className="w-full flex justify-between items-center">
              <span>Todo app</span>
              <span onClick={() => setEditMode((prev) => !prev)}>
                <Edit className="hover:stroke-red-500 hover:cursor-pointer" />
              </span>
            </div>
          </h1>
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
            {labels?.map((label) => (
              <li
                key={label.id}
                className={`mb-2 p-2 rounded cursor-pointer ${
                  activeLabel?.name === label.name ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveLabel(label)}
              >
                <div className="flex space-x-2 justify-between items-center">
                  <span>
                    {label.name === "Inbox" ? (
                      <Inbox className="inline-block" />
                    ) : (
                      <Menu className="inline-block" />
                    )}
                  </span>
                  <div className="w-full flex justify-between items-center">
                    <span className="hidden md:block">{label.name}</span>
                    <span>{editMode && <EditLabel label={label} />}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <div>
          <CreateLabel />
        </div>
        <div>
          <SignoutBtn>Signout</SignoutBtn>
        </div>
      </div>
    </div>
  );
}

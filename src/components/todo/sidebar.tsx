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
import { AvatarFallback, Avatar } from "../ui/avatar";

export function Sidebar() {
  const { loading, labels } = useLabel();
  const [activeLabel, setActiveLabel] = useRecoilState(activeLabelAtom);
  const [editMode, setEditMode] = useState<boolean>(false);
  const skeletonArray = [1, 2, 3, 4];
  return (
    <div className="flex flex-col justify-between min-h-full overflow-x-hidden">
      <div>
        <div className="flex space-x-2">
          <h1 className="w-full text-2xl font-bold mb-4 justify-between">
            <div className="w-full flex justify-between items-center p-2">
              <span className="hidden md:block">Todo app</span>
              <span onClick={() => setEditMode((prev) => !prev)}>
                <Edit
                  className={`hover:stroke-red-500 hover:cursor-pointer ${
                    editMode && "stroke-red-500"
                  }`}
                />
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
                className={`mb-2 p-2 rounded cursor-pointer flex justify-start items-center ${
                  activeLabel?.name === label.name ? "bg-gray-700" : ""
                } ${editMode && "w-40"}`}
                onClick={() => setActiveLabel(label)}
              >
                <div className="flex justify-between items-center space-x-2">
                  <span className={`${editMode && "hidden"} w-full`}>
                    {label.name === "Inbox" ? (
                      <span className="p-1">
                        <Inbox className="inline-block" />
                      </span>
                    ) : (
                      <span className="flex">
                        <Menu className="hidden md:block" />
                        <Avatar className="md:hidden">
                          <AvatarFallback className="text-white bg-gray-900 border-2 capitalize hover:bg-gray-700 font-bold">
                            {label.name[0] + label.name[1]}
                          </AvatarFallback>
                        </Avatar>
                      </span>
                    )}
                  </span>
                  <div className="w-full flex justify-between items-center ">
                    <span className="hidden md:block">{label.name}</span>
                    <span>{editMode && <EditLabel label={label} />}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full">
          <CreateLabel />
        </div>
        <div className="w-full">
          <SignoutBtn>Sign Out</SignoutBtn>
        </div>
      </div>
    </div>
  );
}

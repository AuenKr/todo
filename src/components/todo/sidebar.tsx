"use client";
import { useLabel } from "@/hooks/useLabel";
import { Edit, Menu } from "lucide-react";
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
            <span className="p-2 flex justify-center md:justify-between items-center">
              <span className="hidden md:block">Todo app</span>
              <span onClick={() => setEditMode((prev) => !prev)}>
                <Edit
                  className={`hover:stroke-red-500 hover:cursor-pointer ${
                    editMode && " stroke-red-500"
                  }`}
                />
              </span>
            </span>
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
          <ul className="grid grid-cols-1 items-center space-y-2">
            {labels?.map((label) => (
              <li
                key={label.id}
                className={`rounded cursor-pointer grid-cols-1 ${
                  activeLabel?.name === label.name ? "bg-gray-700 " : ""
                } ${editMode ? "w-40" : null}`}
                onClick={() => setActiveLabel(label)}
              >
                <div className="col-span-1">
                  <div className="flex justify-between">
                    <div
                      className={`flex items-center text-lg ${
                        editMode && "hidden md:block"
                      }`}
                    >
                      <div className="flex">
                        <span className="hidden md:block">
                          <Menu />
                        </span>
                        <span className="w-full md:hidden p-1">
                          <Avatar>
                            <AvatarFallback className="text-white bg-gray-900 border-2 uppercase hover:bg-gray-700 font-bold">
                              {label.name[0] + label.name[1]}
                            </AvatarFallback>
                          </Avatar>
                        </span>
                        <span className="hidden md:inline-block font-bold">
                          {label.name}
                        </span>
                      </div>
                    </div>
                    <div className="">
                      {editMode && (
                        <span>
                          <EditLabel label={label} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col items-center justify-center space-y-3">
        <CreateLabel />
        <SignoutBtn />
      </div>
    </div>
  );
}

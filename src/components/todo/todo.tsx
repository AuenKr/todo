"use client";

import { useEffect, useState } from "react";
import { TodoCard } from "./todoCard";
import { useTodoList } from "@/hooks/useTodo";
import { CreateTodo } from "./createTodo";
import { Todo as TodoList } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";
import { useRecoilValue } from "recoil";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { SearchBox } from "./searchbox";

export function Todo() {
  const { loading, todoList } = useTodoList();
  const [filterTask, setFilterTask] = useState<TodoList[]>([]);
  const activeLabel = useRecoilValue(activeLabelAtom);

  useEffect(() => {
    const data = todoList.filter((each) => each.labelId == activeLabel?.id);

    data.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return 0;
    });

    setFilterTask(data);
  }, [todoList, activeLabel]);

  const skeletonArray = [1, 2, 3, 4];

  return (
    <div className="flex-1 p-8">
      <h2 className="w-full text-2xl font-bold mb-4 flex justify-between">
        <span>
          {activeLabel ? (
            activeLabel.name
          ) : (
            <Skeleton className="w-[100px] h-[40px] rounded-xl" />
          )}
        </span>
        <span>
          <SearchBox />
        </span>
      </h2>
      <div className="mb-4 space-y-2 space-x-2">
        <CreateTodo />
      </div>
      <div>
        {loading ? (
          <div className="space-y-2">
            {skeletonArray.map((each) => {
              return (
                <Skeleton key={each} className="w-full h-[30px] rounded-xl" />
              );
            })}
          </div>
        ) : (
          <ul className="space-y-2">
            {filterTask.map((each) => {
              return <TodoCard key={each.id} todo={each}></TodoCard>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

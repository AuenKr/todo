import { getTodo } from "@/actions/todo";
import { todoListAtom } from "@/state/atom/todoListAtom";
import { Todo } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export function useTodoList() {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const cache: TodoCacheType | null = JSON.parse(localStorage.getItem("todos") || '{"todos":[]}');
    if (cache) {
      setTodoList(cache.todos);
      setLoading(false);
    }

    getTodo().then((result) => {
      setTodoList(result);
      setLoading(false);
      localStorage.setItem("todos", JSON.stringify({ todos: result }))
      return result;
    })
  }, [])
  return { loading, todoList };
}

interface TodoCacheType {
  todos: Todo[]
}
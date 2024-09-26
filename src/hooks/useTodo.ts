import { getTodo } from "@/actions/todo";
import { todoListAtom } from "@/state/atom/todoListAtom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export function useTodoList() {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getTodo().then((result) => {
      setTodoList(result);
      setLoading(false);
      return result;
    })
  }, [])
  return { loading, todoList };
}
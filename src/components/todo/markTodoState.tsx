import { markTodoState } from "@/actions/todo";
import { todoListAtom } from "@/state/atom/todoListAtom";
import { Todo } from "@prisma/client";
import { Circle, CircleCheckBig } from "lucide-react";
import { useSetRecoilState } from "recoil";

export function MarkTodoState({ todo }: { todo: Todo }) {
  const setTodoState = useSetRecoilState(todoListAtom);

  const onClickHandler = async () => {
    const tempTodo: Todo = { ...todo, completed: !todo.completed };
    setTodoState((prev) => {
      const allTodo = prev.map((each) => {
        if (each.id === todo.id) return tempTodo;
        return each;
      });
      return allTodo;
    });

    const result = await markTodoState(todo);
    setTodoState((prev) => {
      const allTodo = prev.map((each) => {
        if (each.id === todo.id)
          return { ...each, completed: result as boolean };
        return each;
      });
      return allTodo;
    });
  };

  return (
    <div onClick={onClickHandler} className="hover:cursor-pointer">
      {todo.completed ? <CircleCheckBig /> : <Circle />}
    </div>
  );
}

import { deleteTodo } from "@/actions/todo";
import { todoListAtom } from "@/state/atom/todoListAtom";
import { Todo } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useSetRecoilState } from "recoil";

export function DeleteTodoButton({ todo }: { todo: Todo }) {
  const setTodoState = useSetRecoilState(todoListAtom);

  const onClickHandler = async () => {
    await deleteTodo(todo);

    setTodoState((prev) => {
      const allTodo = prev.filter((each) => {
        if (each.id === todo.id) return false;
        return true;
      });

      return allTodo;
    });
  };

  return (
    <div onClick={onClickHandler}>
      <Trash2 className="stroke-rose-500 hover:stroke-rose-700 hover:cursor-pointer" />
    </div>
  );
}

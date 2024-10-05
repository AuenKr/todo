import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Todo } from "@prisma/client";
import { MarkTodoState } from "./markTodoState";
import { DeleteTodoButton } from "./deleteTodoBtn";
import { EditTodoBtn } from "./editTodo";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export function TodoCard({ todo }: { todo: Todo }) {
  const [isDeadline, setDeadLine] = useState<boolean>(false);
  useEffect(() => {
    if (!todo.deadline) return;
    setDeadLine(todo.deadline < new Date());
  }, [todo]);

  return (
    <li className="w-full flex justify-between border-2 p-2 m-1 rounded-lg">
      <div className="flex space-x-3">
        <MarkTodoState todo={todo} />
        <Dialog>
          <DialogTrigger
            className={`${todo.completed && "line-through"} truncate ${
              isDeadline && "text-red-500"
            }`}
          >
            <span className="text-wrap">{todo.title}</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Todo
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <div className="flex justify-between border-b-2 ">
                <div className="flex space-x-3 p-2 items-center text-xl font-bold">
                  <MarkTodoState todo={todo} />
                  <div>{todo.title}</div>
                </div>
                {todo.deadline && (
                  <div className="flex justify-center items-center">
                    {format(todo.deadline, "PPP")}
                  </div>
                )}
              </div>
              <DialogDescription className="text-lg">
                {todo.description}
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex space-x-2 justify-center items-center">
        <EditTodoBtn todo={todo} />
        <DeleteTodoButton todo={todo} />
      </div>
    </li>
  );
}

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

export function TodoCard({ todo }: { todo: Todo }) {
  return (
    <li className="flex justify-between border-2 p-2 m-1 rounded-lg">
      <div className="flex space-x-3">
        <MarkTodoState todo={todo} />
        <Dialog>
          <DialogTrigger
            className={`${todo.completed && "line-through"} truncate`}
          >
            {todo.title}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Todo
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <div className="border-b-2 flex space-x-3 p-2 items-center text-xl font-bold">
                <MarkTodoState todo={todo} />
                <div>{todo.title}</div>
              </div>
              <DialogDescription className="text-lg">
                {todo.description}
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex space-x-2">
        <EditTodoBtn todo={todo} />
        <DeleteTodoButton todo={todo} />
      </div>
    </li>
  );
}

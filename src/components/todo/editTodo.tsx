"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { updateTodo } from "@/actions/todo";
import { useToast } from "@/hooks/use-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListAtom } from "@/state/atom/todoListAtom";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { Todo } from "@prisma/client";
import { DatePicker } from "../datepicker";

export function EditTodoBtn({ todo }: { todo: Todo }) {
  const [newTask, setNewTask] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description || "");
  const activeLabel = useRecoilValue(activeLabelAtom);
  const setTodo = useSetRecoilState(todoListAtom);
  const [dialog, setDialog] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(
    todo.deadline ? todo.deadline : undefined
  );

  const { toast } = useToast();

  const updateTask = async () => {
    if (newTask.trim() !== "" || newDescription.trim() !== "") {
      const labelId = activeLabel.id;
      const tempTodo: Todo = {
        ...todo,
        title: newTask,
        description: newDescription,
        deadline: date || null,
      };

      setTodo((prev) => {
        const data = prev.map((each) => {
          if (each.id === tempTodo.id) return tempTodo;
          return each;
        });
        return data;
      });
      setDialog(false);

      const result = await updateTodo(
        todo.id,
        newTask,
        labelId,
        newDescription || "",
        date
      );

      if (result) {
        todo = result || todo;

        setTodo((prev) => {
          const data = prev.map((each) => {
            if (each.id === todo.id) return todo;
            return each;
          });
          return data;
        });

        toast({
          title: "Updated todo",
        });

        setNewTask("");
        setNewDescription("");
        setDialog(false);
        return;
      }

      toast({
        title: "Fail to update todo",
      });
    }
  };

  return (
    <Dialog
      onOpenChange={() => {
        setDialog((prev) => !prev);
      }}
      open={dialog}
    >
      <DialogTrigger>
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Add a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="mr-2"
          />
          <Label>Description</Label>
          <Input
            type="text"
            placeholder="Add a description..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="mr-2"
          />
          <span className="flex flex-col">
            <Label>Date</Label>
            <DatePicker date={date || undefined} setDate={setDate} />
          </span>
        </div>
        <DialogFooter>
          <Button onClick={updateTask}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

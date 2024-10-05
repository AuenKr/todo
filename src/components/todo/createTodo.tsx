"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { createTodo } from "@/actions/todo";
import { useToast } from "@/hooks/use-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListAtom } from "@/state/atom/todoListAtom";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { Todo } from "@prisma/client";
import { DatePicker } from "../datepicker";

export function CreateTodo() {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const activeLabel = useRecoilValue(activeLabelAtom);
  const setTodo = useSetRecoilState(todoListAtom);
  const { toast } = useToast();
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>();

  const addTask = async () => {
    if (newTask.trim() !== "" || newDescription.trim() !== "" || activeLabel) {
      const labelId = activeLabel?.id as unknown as number;
      const tempTodo: Todo = {
        id: Math.floor(100000 * Math.random() + 1000000),
        completed: false,
        description: newDescription,
        title: newTask,
        labelId: activeLabel.id,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: date || null,
      };
      setTodo((prev) => {
        return [...prev, tempTodo];
      });
      setDialogState(false);

      const result = await createTodo(newTask, labelId, newDescription, date);
      if (result) {
        setTodo((prev) => {
          const data = prev.filter((each) => each.id != tempTodo.id);
          return [...data, result];
        });
        toast({
          title: "Added todo",
        });

        setNewTask("");
        setNewDescription("");
        return;
      }
      toast({
        title: "Fail to update todo",
      });
    }
  };
  return (
    <Dialog
      open={dialogState}
      onOpenChange={() => setDialogState((prev) => !prev)}
    >
      <DialogTrigger>
        <Button>
          <span>
            <Plus />
          </span>
          <span>Add Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>
        <div className="space-y-1">
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
            <DatePicker date={date} setDate={setDate} />
          </span>
        </div>
        <DialogFooter>
          <Button onClick={addTask}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

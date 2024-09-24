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

export function CreateTodo() {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const activeLabel = useRecoilValue(activeLabelAtom);
  const setTodo = useSetRecoilState(todoListAtom);
  const { toast } = useToast();

  const addTask = async () => {
    if (newTask.trim() !== "" || newDescription.trim() !== "" || activeLabel) {
      const labelId = activeLabel?.id as unknown as number;
      const result = await createTodo(newTask, labelId, newDescription);
      if (!result) {
        toast({
          title: "Fail to update todo",
        });
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setTodo((prev) => [...prev, result]);
      toast({
        title: "Added todo",
      });

      setNewTask("");
      setNewDescription("");
      console.log("saved todo ", result);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Plus className="mr-2" /> Add Task
        </Button>
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
        </div>
        <DialogFooter>
          <Button onClick={addTask}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

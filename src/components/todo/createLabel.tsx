"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { createTodoLabel } from "@/actions/label";
import { useToast } from "@/hooks/use-toast";
import { useSetRecoilState } from "recoil";
import { todoLabelAtom } from "@/state/atom/todoLabelAtom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateLabel() {
  const [newLabel, setNewLabel] = useState<string>("");
  const setLabel = useSetRecoilState(todoLabelAtom);
  const { toast } = useToast();
  const [dialogState, setDialogState] = useState<boolean>(false);

  const addLabel = async () => {
    if (newLabel.trim() !== "") {
      const tempLabel = {
        id: Math.floor(100000 * Math.random() + 100000),
        name: newLabel,
        userId: null,
      };

      setLabel((prev) => [...prev, tempLabel]);
      setDialogState(false);

      const result = await createTodoLabel(newLabel);
      if (result) {
        setLabel((prev) => {
          const filterLabel = prev.filter((each) => each.id != tempLabel.id);
          return [...filterLabel, result];
        });

        return toast({
          title: `Create label ${newLabel}`,
        });
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
      <DialogTrigger className="w-full">
        <div className="w-full p-2 flex justify-center items-center hover:cursor-pointer hover:bg-gray-700 border-2 rounded-xl space-x-1">
          <Plus />
          <span className="hidden md:block">Create Label</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a label</DialogTitle>
          <DialogDescription>
            Add different label to organize todo list
          </DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Add a label..."
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          className="mr-2"
        />
        <Button onClick={addLabel} className="space-x-2">
          <Plus />
          <span>Create Label</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

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

  const addLabel = async () => {
    if (newLabel.trim() !== "") {
      const result = await createTodoLabel(newLabel);
      if (!result) {
        toast({
          title: "Fail to update todo",
        });
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setLabel((prev) => [...prev, result]);
      toast({
        title: `Create label ${newLabel}`,
      });
      setNewLabel("");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>
            <Plus className="mr-2" /> Create Label
          </Button>
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
          <Button onClick={addLabel}>
            <Plus className="mr-2" /> Create Label
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

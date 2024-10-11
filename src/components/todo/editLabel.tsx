"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Edit2 } from "lucide-react";
import { updateLabel } from "@/actions/label";
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
import { Label } from "@prisma/client";
import { DeleteLabelButton } from "./deleteLabelBtn";

export function EditLabel({ label }: { label: Label }) {
  const [newLabel, setNewLabel] = useState<string>(label.name);
  const setLabel = useSetRecoilState(todoLabelAtom);
  const { toast } = useToast();
  const [dialogState, setDialogState] = useState<boolean>(false);

  const addLabel = async () => {
    if (newLabel.trim() !== "") {
      setLabel((prev) => {
        const labels = prev.map((each) => {
          if (each.id === label.id) return { ...each, name: newLabel };
          return each;
        });
        return labels;
      });

      setDialogState(false);

      const result = await updateLabel(label.id, newLabel);
      if (result) {
        return toast({
          title: `Update label ${newLabel}`,
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
      <DialogTrigger className="w-full flex items-center justify-center">
        <span className="hover:cursor-pointer">
          <Edit2 className="hover:stroke-red-400 h-6" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex justify-between">
          <DialogTitle className="flex justify-between mr-3">
            <span>Edit the label</span>
            <div>
              <DeleteLabelButton
                label={label}
                setDialogState={setDialogState}
              />
            </div>
          </DialogTitle>
          <DialogDescription>Edit Label Name</DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Set label name"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          className="mr-2"
        />
        <Button onClick={addLabel} className="space-x-2">
          <span>Update Label</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

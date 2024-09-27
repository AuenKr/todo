import { deleteLabel } from "@/actions/label";
import { todoLabelAtom } from "@/state/atom/todoLabelAtom";
import { Label } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useSetRecoilState } from "recoil";

export function DeleteLabelButton({
  label,
  setDialogState,
}: {
  label: Label;
  setDialogState: Dispatch<SetStateAction<boolean>>;
}) {
  const setLabelState = useSetRecoilState(todoLabelAtom);

  const onClickHandler = async () => {
    setLabelState((prev) => {
      const allLabel = prev.filter((each) => {
        if (each.id === label.id) return false;
        return true;
      });

      return allLabel;
    });
    setDialogState((prev) => !prev);

    await deleteLabel(label);
  };

  return (
    <div onClick={onClickHandler}>
      <Trash2 className="stroke-rose-500 hover:stroke-rose-700 hover:cursor-pointer" />
    </div>
  );
}

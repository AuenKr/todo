import { getTodoLabel } from "@/actions/label";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { todoLabelAtom } from "@/state/atom/todoLabelAtom";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export function useLabel() {
  const [labels, setLabels] = useRecoilState(todoLabelAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const setActiveLabel = useSetRecoilState(activeLabelAtom);
  useEffect(() => {
    getTodoLabel().then((result) => {
      console.log(result);
      setLabels(result);
      setLoading(false);
      setActiveLabel(result[0]);
      return result;
    })
  }, [])
  return { loading, labels };
}
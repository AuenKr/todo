import { getTodoLabel } from "@/actions/label";
import { activeLabelAtom } from "@/state/atom/activeLabelAtom";
import { todoLabelAtom } from "@/state/atom/todoLabelAtom";
import { Label } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export function useLabel() {
  const [labels, setLabels] = useRecoilState(todoLabelAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const setActiveLabel = useSetRecoilState(activeLabelAtom);
  useEffect(() => {
    const cache: LabelCacheType | null = JSON.parse(localStorage.getItem("labels") || '{"labels":[]}');
    if (cache) {
      setLabels(cache.labels);
      setLoading(false);
      setActiveLabel(cache.labels[0]);
    }

    getTodoLabel().then((result) => {
      setLabels(result);
      setLoading(false);
      setActiveLabel(result[0]);
      localStorage.setItem("labels", JSON.stringify({ labels: result }))
      return result;
    })
  }, [])
  return { loading, labels };
}

interface LabelCacheType {
  labels: Label[]
}
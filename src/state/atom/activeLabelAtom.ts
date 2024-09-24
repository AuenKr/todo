import { Label } from "@prisma/client";
import { atom } from "recoil";

export const activeLabelAtom = atom<Label | null>({
  key: "ActiveLabel",
  default: null
})
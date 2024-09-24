import { Label } from "@prisma/client";
import { atom } from "recoil";

export const todoLabelAtom = atom<Label[]>({
  key: 'TodoLabel',
  default: [],
});
import { Label } from "@prisma/client";
import { atom } from "recoil";

export const activeLabelAtom = atom<Label>({
  key: "ActiveLabel",
  default: {
    id: 1000000,
    name: "Inbox",
    userId: null
  }
})
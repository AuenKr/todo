import { Todo } from "@prisma/client";
import { atom } from "recoil";

export const todoListAtom = atom<Todo[]>({
  key: 'TodoList',
  default: [],
});
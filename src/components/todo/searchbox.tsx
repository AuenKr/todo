import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Todo } from "@prisma/client";
import Fuse from "fuse.js";
import { TodoCard } from "./todoCard";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRecoilValue } from "recoil";
import { todoListAtom } from "@/state/atom/todoListAtom";
import { Search } from "lucide-react";

export function SearchBox() {
  const [searchItem, setSearchItem] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Todo[]>([]);
  const todoList = useRecoilValue(todoListAtom);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fuse = new Fuse(todoList, {
      keys: ["title", "description", "deadline"],
      threshold: 0.5,
    });
    const result = fuse.search(searchItem).map((each) => each.item);
    setSearchResult(result);
  }, [searchItem, todoList]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Command className="flex justify-center items-center">
        <Search className="md:hidden w-10 hover:cursor-pointer" onClick={() => setOpen(true)} />
        <Input
          value={searchItem}
          onClick={() => setOpen(true)}
          placeholder="Search todo ⌘ K"
          className="hidden md:block"
        />
      </Command>
      <div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Input
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Type to Search todo"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {searchResult.map((each) => {
                return (
                  <CommandItem key={each.id} className="w-full">
                    <TodoCard todo={each} />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </>
  );
}

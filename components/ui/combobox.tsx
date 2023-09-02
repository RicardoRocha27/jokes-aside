"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RankingContext } from "@/contexts/ranking-context";

const filters = [
  {
    value: "profile",
    label: "Profile",
  },
  {
    value: "post",
    label: "Post",
  },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const rankingContext = React.useContext(RankingContext);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" w-[200px] justify-between"
        >
          {rankingContext?.ranking === ""
            ? "Profile"
            : `${rankingContext?.ranking.charAt(0).toUpperCase()}` +
              `${rankingContext?.ranking.slice(1)}`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {filters.map((filter) => (
              <CommandItem
                key={filter.value}
                onSelect={(currentValue) => {
                  rankingContext?.setRanking(
                    currentValue === rankingContext?.ranking
                      ? "profile"
                      : currentValue
                  );
                  setOpen(false);
                }}
              >
                {filter.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    rankingContext?.ranking === filter.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

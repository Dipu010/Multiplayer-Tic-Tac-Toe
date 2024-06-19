"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Button
        className="hidden dark:flex items-center   justify-center shadow-md shadow-primary/10 bg-transparent hover:bg-light border-none px-3 py-1"
        variant={"outline"}
        onClick={() => setTheme("light")}
      >
        <SunIcon className="" />
      </Button>
      <Button
        className="block dark:hidden shadow-sm shadow-primary/10 bg-transparent hover:bg-light border-none  px-3 py-1 "
        variant={"outline"}
        onClick={() => setTheme("dark")}
      >
        <MoonIcon className="" />
      </Button>
    </>
  );
}

"use client";

import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

const Menu = () => {
  return (
    <div className="flex items-center gap-x-4">
      <Button onClick={() => {}}>Create Post</Button>
      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Menu;

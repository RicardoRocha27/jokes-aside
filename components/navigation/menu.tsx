"use client";

import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { usePostModal } from "@/hooks/use-post-modal";

const Menu = () => {
  const postModal = usePostModal();

  return (
    <div className="flex items-center gap-x-4">
      <Button onClick={() => postModal.onOpen()}>Create Post</Button>
      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Menu;

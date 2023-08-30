"use client";

import { UserButton } from "@clerk/nextjs";
import { Profile } from "@prisma/client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { usePostModal } from "@/hooks/use-post-modal";
import Link from "next/link";
import { Trophy } from "lucide-react";
import MobileMenu from "./mobile-menu";

interface MenuProps {
  loggedUser: Profile;
}

const Menu: React.FC<MenuProps> = ({ loggedUser }) => {
  const postModal = usePostModal();

  return (
    <div className="flex items-center gap-x-4">
      <Button onClick={() => postModal.onOpen()}>Create Post</Button>
      <MobileMenu loggedUser={loggedUser} />
      <div className="hidden sm:flex items-center gap-x-4">
        <Link href="/ranking">
          <Trophy />
        </Link>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Menu;

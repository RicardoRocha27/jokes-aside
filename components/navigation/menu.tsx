"use client";

import Link from "next/link";
import { Trophy, User2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Profile } from "@prisma/client";

import MobileMenu from "@/components/navigation/mobile-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { usePostModal } from "@/hooks/use-post-modal";

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
        <Link title="Ranking Page" href="/ranking">
          <Trophy />
        </Link>
        <Link
          title="Profile Page"
          href={`/profile/${loggedUser.id}/created-posts`}
        >
          <User2 />
        </Link>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Menu;

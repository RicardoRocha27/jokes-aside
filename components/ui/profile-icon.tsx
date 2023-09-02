"use client";

import { Profile } from "@prisma/client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { LogOut, User2 } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

interface ProfileIconProps {
  profile: Profile;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <Image
            className="rounded-full"
            src={profile.imageUrl}
            alt=""
            width={32}
            height={32}
          />
        </DropdownMenuTrigger>
        {isOpen && (
          <DropdownMenuContent className="w-96 p-6 absolute top-1 right-0">
            <DropdownMenuGroup>
              <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                  <Image
                    className="rounded-full"
                    src={profile.imageUrl}
                    alt=""
                    width={44}
                    height={44}
                  />
                  <div className="flex flex-col overflow-hidden">
                    <p className="text-sm font-medium">{profile.username}</p>
                    <p className="text-xs text-muted-foreground">
                      {profile.email}
                    </p>
                  </div>
                </div>
                <Link
                  onClick={() => setIsOpen(false)}
                  href={`/profile/${profile.id}/created-posts`}
                  className="flex items-center gap-x-4 cursor-pointer group"
                >
                  <div className="absolute w-full left-0 h-10  group-hover:bg-slate-950/10 dark:group-hover:bg-white/20" />
                  <div className="w-11 flex  gap-y-6 items-center justify-center">
                    <User2 size={16} />
                  </div>
                  <div className="text-sm">Account</div>
                </Link>
                <SignOutButton>
                  <div className="flex items-center gap-x-4 cursor-pointer group">
                    <div className="absolute w-full left-0 h-10 group-hover:bg-slate-950/10 dark:group-hover:bg-white/20" />
                    <div className="w-11 flex  gap-y-6 items-center justify-center">
                      <LogOut size={16} />
                    </div>
                    <div className="text-sm">Sign out</div>
                  </div>
                </SignOutButton>
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
};

export default ProfileIcon;

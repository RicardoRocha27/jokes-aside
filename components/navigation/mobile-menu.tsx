"use client";

import { LogOut, MenuIcon, Trophy, User2, X } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

import IconButton from "@/components/ui/icon-button";
import { Profile } from "@prisma/client";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

interface MobileMenuProps {
  loggedUser: Profile;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ loggedUser }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <div className="flex sm:hidden" onClick={onOpen}>
        <MenuIcon className="cursor-pointer" />
      </div>
      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* Background */}
        <div className="fixed inset-0 bg-background/80" />
        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex ">
          <Dialog.Panel className="relative ml-auto h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-slate-950 py-4 pb-6 shadow-xl">
            <div className="flex flex-col justify-between h-full px-4">
              <div className="flex items-center justify-end">
                {/* Close button */}
                <IconButton
                  className="bg-white dark:bg-slate-950 focus:outline-none"
                  icon={<X size={15} />}
                  onClick={onClose}
                />
              </div>
              {/* Menu */}
              <div className="mb-auto">
                <div className="flex items-center gap-x-2">
                  <Image
                    className="rounded-full"
                    src={loggedUser.imageUrl}
                    alt=""
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">
                      {loggedUser.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {loggedUser.email}
                    </p>
                  </div>
                </div>
                <Separator className="my-3" />
              </div>
              <div className="mb-auto">
                <ul className="space-y-5">
                  <Link
                    href="/ranking"
                    className="flex items-center gap-x-4 "
                    onClick={onClose}
                  >
                    <Trophy size={20} />
                    <p className="text-sm">Ranking</p>
                  </Link>
                  <Link
                    href={`/profile/${loggedUser.id}/created-posts`}
                    className="flex items-center gap-x-4"
                    onClick={onClose}
                  >
                    <User2 size={20} />
                    <p className="text-sm">Profile</p>
                  </Link>
                </ul>
              </div>
              <div className="">
                <Separator className="my-3" />
                <div className=" flex items-center justify-between">
                  <SignOutButton>
                    <div className="flex items-center gap-x-4 cursor-pointer">
                      <LogOut size={20} />
                      <p className="text-sm">Sign out</p>
                    </div>
                  </SignOutButton>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileMenu;

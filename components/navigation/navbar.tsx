import Image from "next/image";
import Link from "next/link";

import Menu from "./menu";

import LogoImage from "@/public/logo.png";
import { currentProfile } from "@/lib/current-profile";
import { Profile } from "@prisma/client";

const Navbar = async () => {
  const loggedUser = await currentProfile();

  return (
    <div className="h-20 w-full flex items-center justify-between">
      <Link href="/home" className="flex items-center gap-x-3">
        <Image src={LogoImage} alt="" width={35} height={35} />
        <h1 className="font-bold text-lg">Jokes Aside</h1>
      </Link>
      <Menu loggedUser={loggedUser as Profile} />
    </div>
  );
};

export default Navbar;

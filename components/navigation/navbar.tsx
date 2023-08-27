import Image from "next/image";

import LogoImage from "@/public/logo.png";
import Menu from "./menu";

const Navbar = () => {
  return (
    <div className="h-20 w-full flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <Image src={LogoImage} alt="" width={35} height={35} />
        <h1 className="font-bold text-lg">Jokes Aside</h1>
      </div>
      <Menu />
    </div>
  );
};

export default Navbar;

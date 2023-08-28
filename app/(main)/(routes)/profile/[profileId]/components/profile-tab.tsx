"use client";

import Link from "next/link";
import { Profile } from "@prisma/client";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProfileTabProps {
  profile: Profile;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ profile }) => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Created Posts",
      href: `/profile/${profile.id}/created-posts`,
      active: pathname === `/profile/${profile.id}/created-posts`,
    },
    {
      label: "Liked Posts",
      href: `/profile/${profile.id}/liked-posts`,
      active: pathname === `/profile/${profile.id}/liked-posts`,
    },
  ];

  return (
    <div className="w-full flex flex-col sm:flex-row my-5 gap-y-3 sm:gap-x-3">
      {routes.map((route, index) => (
        <Link className="w-full" key={index} href={route.href}>
          <Button
            variant={route.active ? "default" : "outline"}
            className="w-full"
          >
            {route.label}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default ProfileTab;

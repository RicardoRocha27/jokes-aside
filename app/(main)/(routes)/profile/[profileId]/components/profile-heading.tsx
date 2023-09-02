"use client";

import { useProfileDescriptioModal } from "@/hooks/use-profile-description-modal";
import { Profile } from "@prisma/client";
import { Edit } from "lucide-react";
import Image from "next/image";

interface ProfileHeadingProps {
  profile: Profile;
  isUserProfile: boolean;
}

const ProfileHeading: React.FC<ProfileHeadingProps> = ({
  profile,
  isUserProfile,
}) => {
  const profileDescriptionModal = useProfileDescriptioModal();

  const description = profile.description
    ? profile.description
    : `${
        isUserProfile
          ? "Welcome to your profile page. Here you can check on your masterpiece."
          : `Take a look and explore ${profile.username}'s jokes. Just don't laugh too hard, it would be awkward`
      }`;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-x-3 mt-10">
      <Image
        src={profile.imageUrl}
        alt=""
        width={70}
        height={70}
        className="rounded-full"
      />
      <div className="flex flex-col gap-y-0 items-center sm:items-start text-center sm:text-start">
        <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-pink-800 via-cyan-700 to-pink-800 bg-clip-text text-transparent">
          {isUserProfile ? "My profile" : `${profile.username} profile`}
        </h1>
        <div className="flex gap-x-0 sm:gap-x-2 items-center flex-col sm:flex-row gap-y-2 sm:gap-y-0">
          <p className="text-sm text-muted-foreground">{description}</p>
          {isUserProfile && (
            <Edit
              size={15}
              color="hsl(var(--muted-foreground))"
              className="cursor-pointer"
              onClick={() =>
                profileDescriptionModal.onOpen(profile.id, description)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeading;

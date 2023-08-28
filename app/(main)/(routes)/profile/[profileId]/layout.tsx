import { Heading } from "@/components/ui/heading";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";

import ProfileTab from "./components/profile-tab";

const ProfileLayout = async ({
  children,
  params,
}: {
  children: string;
  params: { profileId: string };
}) => {
  const loggedUser = await currentProfile();

  if (!loggedUser) {
    return redirectToSignIn();
  }

  const isUserProfile = loggedUser.id === params.profileId;

  const profile = await db.profile.findUnique({
    where: {
      id: params.profileId,
    },
  });

  if (!profile) {
    return null;
  }

  return (
    <div>
      <Heading
        title={isUserProfile ? "My profile" : `${profile.username} profile`}
        description={
          isUserProfile
            ? "Welcome to your profile page. Here you can check on your masterpiece."
            : `Take a look and explore ${profile.username}'s jokes. Just don't laugh too hard, it would be awkward`
        }
      />
      <ProfileTab profile={profile} />
      {children}
    </div>
  );
};

export default ProfileLayout;

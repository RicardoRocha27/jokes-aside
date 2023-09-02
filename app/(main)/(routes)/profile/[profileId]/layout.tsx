import { Heart, MessageSquare, PencilRuler } from "lucide-react";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

import { Heading } from "@/components/ui/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ProfileTab from "./components/profile-tab";
import { redirect } from "next/navigation";

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
    include: {
      createdPosts: true,
      likedPosts: true,
      comments: true,
    },
  });

  if (!profile) {
    redirect("/home");
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
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mt-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Created Posts</CardTitle>
            <PencilRuler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {profile.createdPosts.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Liked Posts</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {profile.likedPosts.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Commented Posts
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{profile.comments.length}</div>
          </CardContent>
        </Card>
      </div>
      <ProfileTab profile={profile} />
      {children}
    </div>
  );
};

export default ProfileLayout;

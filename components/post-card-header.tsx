"use client";

import Image from "next/image";
import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PostCardHeaderProps {
  profile: Profile;
  time: string;
}

const PostCardHeader: React.FC<PostCardHeaderProps> = ({ profile, time }) => {
  const router = useRouter();

  return (
    <CardHeader
      onClick={() => router.push(`/profile/${profile.id}/created-posts`)}
      className="flex flex-row items-center justify-between space-y-0 pb-2 gap-x-5"
    >
      <CardTitle className="text-md font-medium flex items-center gap-x-2 cursor-pointer">
        <Image
          src={profile.imageUrl}
          alt=""
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col overflow-hidden whitespace-pre">
          <p className="text-sm">{profile.username}</p>
          <p className="text-xs text-muted-foreground">{profile.email}</p>
        </div>
      </CardTitle>
      <CardDescription className="text-xs">{time}</CardDescription>
    </CardHeader>
  );
};

export default PostCardHeader;

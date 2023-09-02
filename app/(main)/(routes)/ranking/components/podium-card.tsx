import Image from "next/image";
import Link from "next/link";
import { Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileWithTotalLikes } from "@/types";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@prisma/client";

interface PodiumCardProps {
  isPosts: boolean;
  medal: string;
  profile: ProfileWithTotalLikes;
  post: Post;
}

const PodiumCard: React.FC<PodiumCardProps> = ({
  medal,
  profile,
  post,
  isPosts,
}) => {
  if (!post) {
    return;
  }
  //@ts-ignore
  const likes = isPosts ? post.likes.length : profile.totalLikes;

  return (
    <Card
      className={cn(
        "w-full overflow-hidden relative mt-0 sm:mt-auto",
        medal === "gold"
          ? "sm:h-64"
          : medal === "silver"
          ? "sm:h-60"
          : "sm:h-56"
      )}
    >
      <CardHeader>
        <CardTitle>
          <Link
            href={`/profile/${profile.id}/created-posts`}
            className="flex flex-col items-center gap-y-2"
          >
            {!isPosts && (
              <Image
                src={profile.imageUrl}
                alt=""
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
            <p className="text-lg break-all text-center">
              {isPosts ? post.title : profile.username}
            </p>
            {isPosts && (
              <div className="flex flex-col gap-y-2">
                <p className="text-xs break-all text-center">
                  {`"${post.description}"`}
                </p>
                <p className="text-xs break-all text-center text-muted-foreground">
                  {
                    //@ts-ignore
                    post.profile.username
                  }
                </p>
              </div>
            )}
            <p className="text-sm">
              {likes} {likes === 1 ? "like" : "likes"}
            </p>
            <Medal color={medal} size={30} />
            <p className="text-xs text-muted-foreground">
              {medal === "gold" ? "1st " : medal === "silver" ? "2nd " : "3rd "}
              Place
            </p>
          </Link>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PodiumCard;

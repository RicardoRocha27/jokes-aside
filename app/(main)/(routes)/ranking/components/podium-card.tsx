import Image from "next/image";
import Link from "next/link";
import { Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileWithTotalLikes } from "@/types";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface PodiumCardProps {
  medal: string;
  profile: ProfileWithTotalLikes;
}

const PodiumCard: React.FC<PodiumCardProps> = ({ medal, profile }) => {
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
            <Image
              src={profile.imageUrl}
              alt=""
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="text-lg break-all text-center">{profile.username}</p>
            <p className="text-sm">
              {profile.totalLikes} {profile.totalLikes === 1 ? "like" : "likes"}
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

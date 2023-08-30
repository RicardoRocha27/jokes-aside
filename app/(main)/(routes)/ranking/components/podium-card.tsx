import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileWithTotalLikes } from "@/types";
import { Medal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PodiumCardProps {
  medal: string;
  profile: ProfileWithTotalLikes;
}

const PodiumCard: React.FC<PodiumCardProps> = ({ medal, profile }) => {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>
          <Link
            href={`/profile/${profile.id}/created-posts`}
            className="flex flex-col items-center gap-y-2"
          >
            <Image
              src={profile.imageUrl}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-lg  break-all text-center">{profile.username}</p>
            <p className="text-sm">
              {profile.totalLikes} {profile.totalLikes === 1 ? "like" : "likes"}
            </p>
            <Medal color={medal} />
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

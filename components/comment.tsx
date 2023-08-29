import { Comment, Profile } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface CommentProps {
  onCard?: boolean;
  profile: Profile;
  comment: Comment;
}

const Comment: React.FC<CommentProps> = ({ onCard, profile, comment }) => {
  const time = formatDistanceToNow(comment.createdAt, { addSuffix: true });

  return (
    <>
      <div className="flex justify-between items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <Image
            src={profile.imageUrl}
            alt=""
            width={onCard ? 20 : 32}
            height={onCard ? 20 : 32}
            className="rounded-full"
          />
          <div className="flex flex-col overflow-hidden whitespace-pre">
            <p className={cn("text-sm font-medium", onCard && "text-xs")}>
              {profile.username}
            </p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">{time}</div>
      </div>
      <div>
        <p className={cn("text-sm", onCard && "text-xs mt-1")}>
          {comment.text}
        </p>
      </div>
      {!onCard && <Separator />}
    </>
  );
};

export default Comment;

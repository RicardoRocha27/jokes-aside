import { Comment, Profile } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { Separator } from "./ui/separator";

interface CommentProps {
  profile: Profile;
  comment: Comment;
}

const Comment: React.FC<CommentProps> = ({ profile, comment }) => {
  const time = formatDistanceToNow(comment.createdAt, { addSuffix: true });

  return (
    <>
      <div className="text-md font-medium flex justify-between items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <Image
            src={profile.imageUrl}
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex flex-col overflow-hidden whitespace-pre">
            <p className="text-sm">{profile.username}</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">{time}</div>
      </div>
      <div>
        <p className="text-sm">{comment.text}</p>
      </div>
      <Separator />
    </>
  );
};

export default Comment;

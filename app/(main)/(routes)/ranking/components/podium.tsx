import { ProfileWithTotalLikes } from "@/types";

import PodiumCard from "./podium-card";
import { Post } from "@prisma/client";

interface PodiumProps {
  isPosts: boolean;
  sortedPosts: Post[];
  sortedProfiles: ProfileWithTotalLikes[];
}

const Podium: React.FC<PodiumProps> = ({
  sortedProfiles,
  sortedPosts,
  isPosts,
}) => {
  return (
    <>
      <div className="hidden sm:flex justify-between gap-x-3 max-w-2xl mx-auto">
        <PodiumCard
          isPosts={isPosts}
          medal="silver"
          key={sortedProfiles[1].id}
          profile={sortedProfiles[1]}
          post={sortedPosts[1]}
        />
        <PodiumCard
          isPosts={isPosts}
          medal="gold"
          key={sortedProfiles[0].id}
          profile={sortedProfiles[0]}
          post={sortedPosts[0]}
        />
        <PodiumCard
          isPosts={isPosts}
          medal="#CD7F32"
          key={sortedProfiles[2].id}
          profile={sortedProfiles[2]}
          post={sortedPosts[2]}
        />
      </div>
      <div className="flex sm:hidden flex-col gap-y-4">
        <PodiumCard
          isPosts={isPosts}
          medal="gold"
          key={sortedProfiles[0].id}
          profile={sortedProfiles[0]}
          post={sortedPosts[0]}
        />
        <PodiumCard
          isPosts={isPosts}
          medal="silver"
          key={sortedProfiles[1].id}
          profile={sortedProfiles[1]}
          post={sortedPosts[1]}
        />
        <PodiumCard
          isPosts={isPosts}
          medal="#CD7F32"
          key={sortedProfiles[2].id}
          profile={sortedProfiles[2]}
          post={sortedPosts[2]}
        />
      </div>
    </>
  );
};

export default Podium;

import { db } from "@/lib/db";
import { ProfileWithTotalLikes } from "@/types";

import { Heading } from "@/components/ui/heading";

import Podium from "./components/podium";
import Table from "./components/table";

const RankingPage = async () => {
  const profiles = await db.profile.findMany({
    include: {
      createdPosts: {
        include: {
          likes: true,
        },
      },
    },
  });

  const profilesWithTotalLikes = profiles.map((profile) => {
    const totalLikes = profile.createdPosts.reduce((total, post) => {
      return total + post.likes.length;
    }, 0);
    return {
      ...profile,
      totalLikes,
    };
  });

  const sortedProfiles: ProfileWithTotalLikes[] = profilesWithTotalLikes.sort(
    (profileA, profileB) => profileB.totalLikes - profileA.totalLikes
  );

  return (
    <div>
      <Heading
        title="Ruling the Humor Realm with Unrivaled Wit and Laughter"
        description="Joke Monarchs and Royalty of Laughter in the Leading League"
      />
      <div className="my-5 ">
        <Podium sortedProfiles={sortedProfiles} />
        <Table sortedProfiles={sortedProfiles.slice(3)} />
      </div>
    </div>
  );
};

export default RankingPage;

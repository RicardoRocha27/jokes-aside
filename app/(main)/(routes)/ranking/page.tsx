"use client";
import { db } from "@/lib/db";
import { ProfileWithTotalLikes } from "@/types";

import Podium from "./components/podium";
import Table from "./components/table";
import RankingHeader from "./components/ranking-header";
import { Post, Profile } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RankingContext } from "@/contexts/ranking-context";
import Loading from "./components/loading";

const RankingPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(false);
      const response = await axios.get("/api/profiles");
      setProfiles(response.data);
    };

    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    };

    fetchProfiles().finally(() => setIsLoading(false));
    fetchPosts().finally(() => setIsLoading(false));
  }, []);

  const profilesWithTotalLikes = profiles.map((profile) => {
    //@ts-ignore
    const totalLikes = profile.createdPosts.reduce((total, post) => {
      return total + post.likes.length;
    }, 0);
    return {
      ...profile,
      totalLikes,
    };
  });
  //@ts-ignore
  const sortedProfiles: ProfileWithTotalLikes[] = profilesWithTotalLikes.sort(
    (profileA, profileB) => profileB.totalLikes - profileA.totalLikes
  );
  const rankingContext = useContext(RankingContext);
  const isPosts = rankingContext?.ranking === "post";

  return (
    <div>
      <RankingHeader />
      <div className="my-5 ">
        {isLoading || sortedProfiles.length === 0 || posts.length === 0 ? (
          <Loading />
        ) : (
          <>
            <Podium
              isPosts={isPosts}
              sortedPosts={posts}
              sortedProfiles={sortedProfiles}
            />
            <Table
              isPosts={isPosts}
              sortedPosts={posts.slice(3)}
              sortedProfiles={sortedProfiles.slice(3)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RankingPage;

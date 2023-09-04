import { ProfileWithTotalLikes } from "@/types";

import { DataTable } from "@/components/ui/data-table";

import { profileColumns } from "./profiles-columns";
import { postColumns } from "./posts-columns";
import { Post } from "@prisma/client";

interface TablesProps {
  sortedProfiles: ProfileWithTotalLikes[];
  sortedPosts: Post[];
  isPosts: boolean;
}

const Table: React.FC<TablesProps> = ({
  sortedProfiles,
  sortedPosts,
  isPosts,
}) => {
  const formattedProfiles = sortedProfiles.map((item, index) => ({
    id: item.id,
    place: index + 4,
    username: item.username!,
    totalLikes: item.totalLikes,
  }));

  const formattedPosts = sortedPosts.map((item, index) => ({
    id: item.id,
    profileId: item.profileId,
    place: index + 4,
    //@ts-ignore
    username: item.profile.username!,
    title: item.title,
    //@ts-ignore
    totalLikes: item.likes.length,
  }));

  return (
    <div className="mt-5">
      <DataTable
        //@ts-ignore
        columns={isPosts ? postColumns : profileColumns}
        data={isPosts ? formattedPosts : formattedProfiles}
        isPosts={isPosts}
      />
    </div>
  );
};

export default Table;

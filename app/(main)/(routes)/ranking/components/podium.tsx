import { ProfileWithTotalLikes } from "@/types";
import PodiumCard from "./podium-card";

interface PodiumProps {
  sortedProfiles: ProfileWithTotalLikes[];
}

const Podium: React.FC<PodiumProps> = ({ sortedProfiles }) => {
  return (
    <>
      <div className="hidden sm:flex justify-between gap-x-3 max-w-2xl mx-auto">
        <PodiumCard
          medal="silver"
          key={sortedProfiles[1].id}
          profile={sortedProfiles[1]}
        />
        <PodiumCard
          medal="gold"
          key={sortedProfiles[0].id}
          profile={sortedProfiles[0]}
        />
        <PodiumCard
          medal="#CD7F32"
          key={sortedProfiles[2].id}
          profile={sortedProfiles[2]}
        />
      </div>
      <div className="flex sm:hidden flex-col gap-y-4">
        <PodiumCard
          medal="gold"
          key={sortedProfiles[0].id}
          profile={sortedProfiles[0]}
        />
        <PodiumCard
          medal="silver"
          key={sortedProfiles[1].id}
          profile={sortedProfiles[1]}
        />
        <PodiumCard
          medal="#CD7F32"
          key={sortedProfiles[2].id}
          profile={sortedProfiles[2]}
        />
      </div>
    </>
  );
};

export default Podium;

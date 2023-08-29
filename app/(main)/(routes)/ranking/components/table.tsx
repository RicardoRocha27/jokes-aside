import { DataTable } from "@/components/ui/data-table";
import { ProfileWithTotalLikes } from "@/types";
import { columns } from "./columns";

interface TablesProps {
  sortedProfiles: ProfileWithTotalLikes[];
}

const Table: React.FC<TablesProps> = ({ sortedProfiles }) => {
  const formattedProfiles = sortedProfiles.map((item, index) => ({
    id: item.id,
    place: index + 4,
    username: item.username!,
    totalLikes: item.totalLikes,
  }));

  return (
    <div className="mt-5">
      <DataTable columns={columns} data={formattedProfiles} />
    </div>
  );
};

export default Table;

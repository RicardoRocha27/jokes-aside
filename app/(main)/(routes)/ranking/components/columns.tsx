"use client";

import { ColumnDef } from "@tanstack/react-table";

export type RankingColumn = {
  id: string;
  place: number;
  username: string;
  totalLikes: number;
};

export const columns: ColumnDef<RankingColumn>[] = [
  {
    accessorKey: "place",
    header: "Place",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "totalLikes",
    header: "Total likes",
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ProfileRankingColumn = {
  id: string;
  place: number;
  username: string;
  totalLikes: number;
};

export const profileColumns: ColumnDef<ProfileRankingColumn>[] = [
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

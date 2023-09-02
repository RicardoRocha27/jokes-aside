"use client";

import { ColumnDef } from "@tanstack/react-table";

export type PostRankingColumn = {
  id: string;
  place: number;
  username: string;
  title: string;
  totalLikes: number;
};

export const postColumns: ColumnDef<PostRankingColumn>[] = [
  {
    accessorKey: "place",
    header: "Place",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "totalLikes",
    header: "Total likes",
  },
];

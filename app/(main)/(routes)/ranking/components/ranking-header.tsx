"use client";
import { Heading } from "@/components/ui/heading";
import { Combobox } from "@/components/ui/combobox";
import React from "react";

const RankingHeader = () => {
  return (
    <div className="mt-10 flex w-full flex-col gap-y-2 sm:gap-y-0 items-center  sm:flex-row sm:justify-between">
      <Heading
        title="Joke Monarchs and Royalty of Laughter in the Leading League"
        description="Ruling the Humor Realm with Unrivaled Wit and Laughter"
      />
      <Combobox />
    </div>
  );
};

export default RankingHeader;

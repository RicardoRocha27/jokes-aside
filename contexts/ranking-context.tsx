"use client";
import React, { useState } from "react";
import { createContext } from "react";

type RankingContextType = {
  ranking: string;
  setRanking: (value: string) => void;
};
export const RankingContext = createContext<RankingContextType | null>(null);

const RankingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ranking, setRanking] = useState("profile");
  const value: RankingContextType = {
    ranking,
    setRanking,
  };

  return (
    <RankingContext.Provider value={value}>{children}</RankingContext.Provider>
  );
};

export default RankingContextProvider;

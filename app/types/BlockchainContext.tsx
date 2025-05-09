"use client";

import { createContext, useContext, useState } from "react";

interface BlockchainContextType {
  selectedBlockchain: string;
  setSelectedBlockchain: (blockchain: string) => void;
  resetBlockchain: () => void;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(
  undefined
);

export const BlockchainProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>("");

  const resetBlockchain = () => {
    setSelectedBlockchain("");
  };

  return (
    <BlockchainContext.Provider
      value={{ selectedBlockchain, setSelectedBlockchain, resetBlockchain }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error("useBlockchain must be used within a BlockchainProvider");
  }
  return context;
};

"use client";

import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import Solana from "./Solana";
import Ethereum from "./Ethereum";
import { Wallet, ChevronRight, Coins } from "lucide-react";
import { useBlockchain } from "../types/BlockchainContext";

// Blockchain option component
const BlockchainOption = ({
  name,
  icon,
  color,
  onClick,
}: {
  name: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.97 }}
      className={`${color} p-6 rounded-xl shadow-lg cursor-pointer`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 p-3 bg-white bg-opacity-10 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-white text-opacity-80 text-sm">
              Create or import wallets
            </p>
          </div>
        </div>
        <ChevronRight className="text-white" />
      </div>
    </motion.div>
  );
};

// WalletSelector Component
const WalletSelector = ({
  onSelect,
}: {
  onSelect: (blockchain: string) => void;
}) => {
  return (
    <div className="min-h-screen bg-white pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block p-3 bg-gray-100 rounded-full mb-4"
          >
            <Coins size={32} className="text-black" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            Choose Your Blockchain
          </h1>
          <p className="text-xl text-gray-600">
            Ragnum supports multiple blockchains for your wallet needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BlockchainOption
            name="Solana"
            icon={<Wallet size={24} className="text-black" />}
            color="bg-black"
            onClick={() => onSelect("solana")}
          />

          <BlockchainOption
            name="Ethereum"
            icon={<Wallet size={24} className="text-black" />}
            color="bg-black"
            onClick={() => onSelect("ethereum")}
          />
        </div>

        <motion.div
          className="mt-16 p-8 bg-white rounded-xl shadow-lg border border-gray-200 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 z-0"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-50 rounded-full -ml-12 -mb-12 z-0"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-black mb-6 tracking-tight">
              Why Choose{" "}
              <span className="border-b-2 border-black pb-1">Ragnum</span>?
            </h3>

            <ul className="space-y-5">
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                whileHover={{ x: 5 }}
              >
                <div className="mr-4 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  01
                </div>
                <div>
                  <p className="font-medium text-black">
                    Secure wallet generation and management
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Industry-standard encryption keeps your assets safe
                  </p>
                </div>
              </motion.li>

              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                whileHover={{ x: 5 }}
              >
                <div className="mr-4 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  02
                </div>
                <div>
                  <p className="font-medium text-black">
                    Support for multiple blockchains
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage all your assets in one secure location
                  </p>
                </div>
              </motion.li>

              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                whileHover={{ x: 5 }}
              >
                <div className="mr-4 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  03
                </div>
                <div>
                  <p className="font-medium text-black">
                    Easy-to-use interface with modern design
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Intuitive experience for both beginners and experts
                  </p>
                </div>
              </motion.li>

              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                whileHover={{ x: 5 }}
              >
                <div className="mr-4 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  04
                </div>
                <div>
                  <p className="font-medium text-black">
                    Complete control over your private keys
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    You own your keys, you own your crypto
                  </p>
                </div>
              </motion.li>
            </ul>

            <motion.div
              className="mt-8 pt-6 border-t border-gray-100 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            >
              <p className="text-sm text-gray-500 italic">
                Join thousands of users who trust Ragnum for their crypto needs
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Parent Component to Manage State and Rendering
const BlockchainSelector = () => {
  const { selectedBlockchain, setSelectedBlockchain } = useBlockchain();

  const handleSelect = (blockchain: string) => {
    setSelectedBlockchain(blockchain);
  };

  return (
    <AnimatePresence mode="wait">
      {selectedBlockchain === "solana" ? (
        <motion.div
          key="solana"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Solana />
        </motion.div>
      ) : selectedBlockchain === "ethereum" ? (
        <motion.div
          key="ethereum"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Ethereum />
        </motion.div>
      ) : (
        <motion.div
          key="selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <WalletSelector onSelect={handleSelect} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlockchainSelector;

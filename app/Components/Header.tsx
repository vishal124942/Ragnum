"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { useBlockchain } from "../types/BlockchainContext";

const Header = () => {
  const { resetBlockchain } = useBlockchain();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div
          onClick={resetBlockchain}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ duration: 0.2 }}
          >
            <Wallet size={28} className="text-white" />
          </motion.div>
          <motion.h1
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Ragnum Wallet
          </motion.h1>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

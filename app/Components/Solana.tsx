"use client";

import { useState } from "react";
import { generateMnemonic, validateMnemonic } from "bip39";
import SolWallets from "./SolWallets";
import { useWallet } from "../types/WalletContext";
import { motion } from "framer-motion";
import { KeyRound, RefreshCw, AlertCircle } from "lucide-react";

const Solana = () => {
  const [inputMnemonic, setInputMnemonic] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showSolwallets, setShowSolwallets] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const { setMnemonic } = useWallet();

  const handleGenerateMnemonic = () => {
    setIsGenerating(true);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      const newMnemonic = generateMnemonic();
      setMnemonic(newMnemonic);
      setShowSolwallets(true);
      setIsGenerating(false);
    }, 600);
  };

  const handleAddWallet = () => {
    if (!inputMnemonic.trim()) {
      setError("Please enter a mnemonic phrase");
      return;
    }

    if (!validateMnemonic(inputMnemonic)) {
      setError("Invalid mnemonic phrase");
      return;
    }

    // Valid mnemonic, proceed to Solwallets
    setError("");
    setMnemonic(inputMnemonic);
    setShowSolwallets(true);
  };

  // If we should show the Solwallets component
  if (showSolwallets) {
    return <SolWallets />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-100 pt-24 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block p-3 bg-gray-100 rounded-full mb-4"
          >
            <KeyRound size={32} className="text-gray-700" />
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Secret Recovery Phrase
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Enter your existing phrase or generate a new one. Make sure to save
            these words in a safe place.
          </motion.p>
        </div>

        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="mb-6">
            <label
              htmlFor="mnemonic"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Secret Phrase
            </label>
            <motion.div whileFocus={{ scale: 1.01 }} className="relative">
              <input
                id="mnemonic"
                type="text"
                value={inputMnemonic}
                onChange={(e) => {
                  setInputMnemonic(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter your 12 or 24 word secret phrase separated by spaces"
                className="w-full px-4 py-3 text-base border rounded-lg outline-none border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
              />
            </motion.div>

            {error && (
              <motion.div
                className="mt-2 flex items-center text-red-500 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle size={14} className="mr-1" />
                {error}
              </motion.div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {inputMnemonic.trim() ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddWallet}
                className="flex-1 px-6 py-3 text-white bg-black rounded-lg font-medium hover: shadow-md transition-all duration-200"
              >
                Continue with Phrase
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateMnemonic}
                disabled={isGenerating}
                className="flex-1 px-6 py-3 text-white bg-black rounded-lg font-medium hover: shadow-md transition-all duration-200 flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={18} className="mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate New Phrase"
                )}
              </motion.button>
            )}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Your secret phrase is the master key to your wallets. Never share it
          with anyone.
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Solana;

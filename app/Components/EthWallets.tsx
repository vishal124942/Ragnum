"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Wallet,
} from "lucide-react";
import { useWallet } from "../types/WalletContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const EthWallets = () => {
  const [showMnemonic, setShowMnemonic] = useState<boolean>(false);
  const [showPrivateKeys, setShowPrivateKeys] = useState<
    Record<string, boolean>
  >({});
  const { wallets, currentMnemonic, addWallet, deleteWallet, clearAllWallets } =
    useWallet();

  if (!currentMnemonic) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-screen"
      >
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Mnemonic Provided
          </h2>
          <p className="text-gray-600">
            Please generate or enter a mnemonic phrase to continue.
          </p>
        </div>
      </motion.div>
    );
  }

  const togglePrivateKey = (publicKey: string) => {
    setShowPrivateKeys((prev) => ({
      ...prev,
      [publicKey]: !prev[publicKey],
    }));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-5xl mx-auto mt-20"
    >
      <motion.div
        className="mb-8 p-6 rounded-xl bg-gray-50 border border-gray-200 shadow-sm"
        layout
      >
        <div className="flex justify-between items-center mb-4">
          <motion.h2
            className="text-xl font-bold text-gray-900"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Your Secret Recovery Phrase
          </motion.h2>
          <motion.button
            onClick={() => setShowMnemonic(!showMnemonic)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {!showMnemonic ? <ArrowDown size={20} /> : <ArrowUp size={20} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {showMnemonic && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                opacity: { duration: 0.2 },
                height: { duration: 0.4 },
              }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
                {currentMnemonic
                  .trim()
                  .split(" ")
                  .map((word, index) => (
                    <motion.div
                      key={index}
                      className="p-3 bg-white border border-gray-200 rounded-lg text-center shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{
                        y: -2,
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <span className="text-gray-900 font-medium">{word}</span>
                    </motion.div>
                  ))}
              </div>
              <div className="mt-4 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    copyToClipboard(currentMnemonic, "Mnemonic phrase");
                  }}
                  className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 font-medium"
                >
                  <Copy size={14} /> Copy Phrase
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            className="text-2xl font-bold text-gray-900"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Ethereum Wallets
          </motion.h2>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addWallet("ETH")}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 shadow-md flex items-center gap-2"
            >
              <Plus size={16} /> Add Wallet
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => clearAllWallets("ETH")}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md"
            >
              Clear All
            </motion.button>
          </div>
        </div>

        {wallets.ETH.length === 0 ? (
          <motion.div
            className="text-center p-12 bg-gray-50 rounded-xl border border-dashed border-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <Wallet size={48} className="text-gray-400 mb-4" />
              <p className="text-gray-600 mb-6">
                No wallets added yet. Click "Add Wallet" to create one.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addWallet("ETH")}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 shadow-md flex items-center gap-2"
              >
                <Plus size={16} /> Add Wallet
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-1 gap-6" layout>
            <AnimatePresence>
              {wallets.ETH.map((wallet, index) => (
                <motion.div
                  key={wallet.public_key}
                  className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-900 flex items-center">
                      <span className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-900 rounded-full mr-3">
                        {index + 1}
                      </span>
                      Wallet {index + 1}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteWallet("ETH", wallet.public_key)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-medium text-gray-500">
                        Public Key
                      </h4>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          copyToClipboard(wallet.public_key, "Public key")
                        }
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <Copy size={14} />
                      </motion.button>
                    </div>
                    <p className="font-mono text-sm break-all bg-gray-50 p-3 rounded-lg border border-gray-100">
                      {wallet.public_key}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-medium text-gray-500">
                        Private Key
                      </h4>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => togglePrivateKey(wallet.public_key)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          {showPrivateKeys[wallet.public_key] ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            copyToClipboard(wallet.private_key, "Private key")
                          }
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Copy size={14} />
                        </motion.button>
                      </div>
                    </div>
                    <p className="font-mono text-sm break-all bg-gray-50 p-3 rounded-lg border border-gray-100">
                      {showPrivateKeys[wallet.public_key]
                        ? wallet.private_key
                        : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EthWallets;

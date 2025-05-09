"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import type { wallet, WalletContextType } from "./wallets";
import { hdkey } from "ethereumjs-wallet";
// Create the context with a default undefined value
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Cache for derived wallets to avoid recalculating
const walletCache: {
  sol: Record<string, wallet[]>;
  eth: Record<string, wallet[]>;
} = {
  sol: {},
  eth: {},
};

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentMnemonic, setCurrentMnemonic] = useState<string | null>(null);
  const [wallets, setWallets] = useState<{
    SOLANA: wallet[];
    ETH: wallet[];
  }>({
    SOLANA: [],
    ETH: [],
  });

  const [walletCounts, setWalletCounts] = useState({
    SOLANA: 0,
    ETH: 0,
  });

  // Set the mnemonic and reset wallets if needed
  const setMnemonic = useCallback((mnemonic: string) => {
    setCurrentMnemonic(mnemonic);

    // Check if we have cached wallets for this mnemonic
    const seed = mnemonicToSeedSync(mnemonic);
    const seedHex = seed.toString("hex");

    // Initialize from cache if available
    setWallets({
      SOLANA: walletCache.sol[seedHex] || [],
      ETH: walletCache.eth[seedHex] || [],
    });

    // Set wallet counts based on cached wallets
    setWalletCounts({
      SOLANA: walletCache.sol[seedHex]?.length || 0,
      ETH: walletCache.eth[seedHex]?.length || 0,
    });
  }, []);

  // Add a new wallet of the specified type
  const addWallet = useCallback(
    (type: "SOLANA" | "ETH") => {
      if (!currentMnemonic) return;

      const seed = mnemonicToSeedSync(currentMnemonic);
      const seedHex = seed.toString("hex");

      setWallets((prevWallets) => {
        const newWallets = { ...prevWallets };

        if (type === "SOLANA") {
          const path = `m/44'/501'/${walletCounts.SOLANA}'/0'`; // Solana's standard path
          const derivedSeed = derivePath(path, seedHex).key;
          const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
          const solanaKeypair = Keypair.fromSecretKey(keyPair.secretKey);

          const newWallet: wallet = {
            public_key: solanaKeypair.publicKey.toBase58(),
            private_key: Buffer.from(solanaKeypair.secretKey).toString(
              "base64"
            ),
          };

          newWallets.SOLANA = [...prevWallets.SOLANA, newWallet];

          // Update cache
          walletCache.sol[seedHex] = newWallets.SOLANA;
        } else if (type === "ETH") {
          const path = `m/44'/60'/${walletCounts.ETH}'/0/0`;
          const hdwallet = hdkey.fromMasterSeed(seed);
          const wallet = hdwallet.derivePath(path).getWallet();

          const privateKey = wallet.getPrivateKey().toString("hex");
          const address = wallet.getAddressString();

          const newWallet: wallet = {
            public_key: address,
            private_key: privateKey,
          };
          console.log(newWallet);
          newWallets.ETH = [...prevWallets.ETH, newWallet];

          // Update cache
          walletCache.eth[seedHex] = newWallets.ETH;
          console.log(walletCache.eth[seedHex]);
        }

        return newWallets;
      });

      setWalletCounts((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
    },
    [currentMnemonic, walletCounts]
  );

  // Delete a wallet by its public key
  const deleteWallet = useCallback(
    (type: "SOLANA" | "ETH", publicKey: string) => {
      if (!currentMnemonic) return;

      const seed = mnemonicToSeedSync(currentMnemonic);
      const seedHex = seed.toString("hex");

      setWallets((prevWallets) => {
        const newWallets = { ...prevWallets };

        newWallets[type] = prevWallets[type].filter(
          (wallet) => wallet.public_key !== publicKey
        );

        // Update cache
        if (type === "SOLANA") {
          walletCache.sol[seedHex] = newWallets.SOLANA;
        } else if (type === "ETH") {
          walletCache.eth[seedHex] = newWallets.ETH;
        }

        return newWallets;
      });

      setWalletCounts((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }));
    },
    [currentMnemonic]
  );

  // Clear all wallets of a specific type
  const clearAllWallets = useCallback(
    (type: "SOLANA" | "ETH") => {
      if (!currentMnemonic) return;

      const seed = mnemonicToSeedSync(currentMnemonic);
      const seedHex = seed.toString("hex");

      setWallets((prevWallets) => {
        const newWallets = { ...prevWallets };
        newWallets[type] = [];

        // Update cache
        if (type === "SOLANA") {
          walletCache.sol[seedHex] = [];
        } else if (type === "ETH") {
          walletCache.eth[seedHex] = [];
        }

        return newWallets;
      });

      setWalletCounts((prev) => ({
        ...prev,
        [type]: 0,
      }));
    },
    [currentMnemonic]
  );

  // Create the context value
  const contextValue: WalletContextType = {
    wallets,
    currentMnemonic,
    setMnemonic,
    addWallet,
    deleteWallet,
    clearAllWallets,
    walletCounts,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

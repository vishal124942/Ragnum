export interface wallet {
  public_key: string;
  private_key: string;
}

export interface DeriveWalletsParams {
  mnemonic: string;
  type: "SOLANA" | "ETH";
}

export interface walletCache {
  sol: Record<string, wallet[]>;
  eth: Record<string, wallet[]>;
}

export interface WalletContextType {
  wallets: {
    SOLANA: wallet[];
    ETH: wallet[];
  };
  currentMnemonic: string | null;
  setMnemonic: (mnemonic: string) => void;
  addWallet: (type: "SOLANA" | "ETH") => void;
  deleteWallet: (type: "SOLANA" | "ETH", publicKey: string) => void;
  clearAllWallets: (type: "SOLANA" | "ETH") => void;
  walletCounts: {
    SOLANA: number;
    ETH: number;
  };
}

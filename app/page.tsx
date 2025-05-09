import { Toaster } from "sonner";
import BlockchainSelector from "./Components/WalletSelector";
import { WalletProvider } from "./types/WalletContext";

export default function Home() {
  return (
    <WalletProvider>
      <BlockchainSelector />
      <Toaster position="top-right" richColors />
    </WalletProvider>
  );
}

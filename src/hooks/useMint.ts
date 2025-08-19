"use client";
import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import contractABI from "../lib/contractABI.json";

// Export your contract address here
export const CONTRACT_ADDRESS = "0xe7F4ABC55d3B05a9bf7619400c1235Bb2A0cBF09";

// If you need to import JSON modules, ensure "resolveJsonModule": true is set in your tsconfig.json.
// The following declaration is not needed and causes errors, so it has been removed.

export function useMint() {
  const [mintAmount, setMintAmount] = useState(1);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [loading, setLoading] = useState(false);
  const [mintMessage, setMintMessage] = useState<string | null>(null);
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { isLoading: isTxLoading, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleMint = async () => {
    if (!address) return;
    setLoading(true);
    setMintMessage(null);
    try {
      const tx = await writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: contractABI,
        functionName: "mintTo",
        args: [address, mintAmount],
        value: parseEther("0.001"),
      });
      if (tx) {
        setTxHash(tx as `0x${string}`);
        setMintMessage("Transaction envoyée ! Vérifie ton wallet pour signer.");
      }
    } catch (err: any) {
      setMintMessage("Erreur mint: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return {
    mintAmount,
    setMintAmount,
    handleMint,
    loading,
    isTxLoading,
    mintMessage,
    isTxSuccess,
    address,
  };
}
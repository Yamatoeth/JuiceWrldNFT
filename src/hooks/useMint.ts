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
    if (!address) {
      setMintMessage("Connectez votre wallet d'abord");
      return;
    }
    
    setLoading(true);
    setMintMessage(null);
    
    try {
      setMintMessage("Préparation de la transaction...");
      
      // Essayons d'abord claim(address, uint256)
      let tx;
      try {
        tx = await writeContractAsync({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: contractABI,
          functionName: "claim",
          args: [address, BigInt(mintAmount)],
          value: parseEther("0.001"),
        });
      } catch (err: any) {
        // Si ça échoue, essayons claim(uint256) - le destinataire sera msg.sender
        if (err?.message?.includes("function") || err?.message?.includes("selector")) {
          tx = await writeContractAsync({
            address: CONTRACT_ADDRESS as `0x${string}`,
            abi: contractABI,
            functionName: "claim",
            args: [BigInt(mintAmount)],
            value: parseEther("0.001"),
          });
        } else {
          throw err;
        }
      }
      
      if (tx) {
        setTxHash(tx as `0x${string}`);
        setMintMessage("Transaction envoyée ! Confirmez dans votre wallet...");
      }
    } catch (err: any) {
      console.error("Mint error:", err);
      
      let errorMessage = "Erreur lors du mint: ";
      
      if (err?.message?.includes("timeout") || err?.message?.includes("took too long")) {
        errorMessage += "Le RPC a timeout. Réessayez avec un réseau moins congestionné.";
      } else if (err?.message?.includes("User rejected")) {
        errorMessage += "Transaction annulée par l'utilisateur.";
      } else if (err?.message?.includes("insufficient funds")) {
        errorMessage += "Fonds insuffisants pour la transaction.";
      } else {
        errorMessage += err?.shortMessage || err?.message || "Erreur inconnue";
      }
      
      setMintMessage(errorMessage);
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
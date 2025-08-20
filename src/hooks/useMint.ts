"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import contractABI from "../lib/contractABI.json";

// Adresse de ton contrat
export const CONTRACT_ADDRESS = "0x698981548FA15810FE9FE5f41e9D9713f5e5DECe";

export function useMint() {
  const [mintAmount, setMintAmount] = useState(1);
  const [mintMessage, setMintMessage] = useState<string | null>(null);
  const { address } = useAccount();

  // Use wagmi's useWriteContract hook
  const { 
    writeContract, 
    data: txHash, 
    error: writeError, 
    isPending: isWritePending 
  } = useWriteContract();

  // Suivi de la transaction
  const { isLoading: isTxLoading, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleMint = async () => {
    if (!address) {
      setMintMessage("Connectez votre wallet d'abord");
      return;
    }

    try {
      setMintMessage("Ouverture de MetaMask...");

      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: contractABI,
        functionName: "claim",
        args: [
          address,                                      // _receiver
          0n,                                           // _tokenId
          1n,                                           // _quantity
          "0x0000000000000000000000000000000000000000", // _currency (native)
          0n,                                           // _pricePerToken
          {
            proof: [],
            quantityLimitPerWallet: 1n,
            pricePerToken: 0n,
            currency: "0x0000000000000000000000000000000000000000",
          },                                            // _allowlistProof
          "0x",                                         // _data
        ],
        value: 0n,
      });
    } catch (err: any) {
      console.error("Mint error:", err);
      setMintMessage(`Erreur: ${err?.message || "Erreur inconnue"}`);
    }
  };

  // Messages de statut
  useEffect(() => {
    if (writeError) {
      let errorMsg = "Erreur: ";
      if (writeError.message.includes("User rejected")) {
        errorMsg += "Transaction annulée par l'utilisateur";
      } else if (writeError.message.includes("insufficient funds")) {
        errorMsg += "Fonds insuffisants";
      } else {
        errorMsg += writeError.message;
      }
      setMintMessage(errorMsg);
    } else if (txHash && !isTxSuccess && !isTxLoading) {
      setMintMessage(`Transaction envoyée ! Hash: ${txHash.slice(0, 10)}...`);
    } else if (isTxLoading) {
      setMintMessage("⏳ Confirmation en cours...");
    } else if (isTxSuccess) {
      setMintMessage("🎉 NFT minté avec succès !");
    }
  }, [writeError, txHash, isTxLoading, isTxSuccess]);

  return {
    mintAmount,
    setMintAmount,
    handleMint,
    loading: isWritePending || isTxLoading,
    isTxLoading,
    mintMessage,
    isTxSuccess,
    address,
  };
}
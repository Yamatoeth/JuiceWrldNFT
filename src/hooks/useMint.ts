"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import contractABI from "../lib/contractABI.json";
import { useContract } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc1155";

// Adresse de ton contrat
export const CONTRACT_ADDRESS = "0x698981548FA15810FE9FE5f41e9D9713f5e5DECe";

export function useMint() {
  const [mintAmount, setMintAmount] = useState(1);
  const [mintMessage, setMintMessage] = useState<string | null>(null);
  const { address } = useAccount();

  // Get contract instance
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutate: sendTransaction, data: txHash, error: writeError, isPending: isWritePending } = useSendTransaction();

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

      const transaction = claimTo({
        contract,
        to: address,
        tokenId: 0,
        amount: 1,
      });

      await sendTransaction(transaction);
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
"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import contractABI from "../lib/contractABI.json";

// Adresse de ton contrat
export const CONTRACT_ADDRESS = "0xe7F4ABC55d3B05a9bf7619400c1235Bb2A0cBF09";

export function useMint() {
  const [mintAmount, setMintAmount] = useState(1);
  const [mintMessage, setMintMessage] = useState<string | null>(null);
  const { address } = useAccount();

  // Hook Wagmi pour écrire sur le contrat - pas besoin de signer dans wagmi v2
  const { writeContract, data: txHash, error: writeError, isPending: isWritePending } = useWriteContract();

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

      const claimArgs = {
        _receiver: address,
        _quantity: mintAmount, // Utilise mintAmount du state
        _currency: '0x0000000000000000000000000000000000000000', // payer en Ether
        _pricePerToken: parseEther("0.001"), // prix par NFT
        _allowlistProof: {
          proof: [],
          quantityLimitPerWallet: '0',
          pricePerToken: '0',
          currency: '0x0000000000000000000000000000000000000000',
        },
        _data: '0x',
      };

      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: contractABI,
        functionName: "claim",
        args: [claimArgs],
        value: parseEther((0.001 * mintAmount).toString()), // Prix total basé sur la quantité
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
    mintMessage,
    isTxLoading,
    isTxSuccess,
    address,
  };
}
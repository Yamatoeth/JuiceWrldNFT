"use client";
import { useState, useEffect } from "react";
import { useContract, useAddress, useNetwork } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

// Adresse de ton contrat ERC1155 sur Sepolia
export const CONTRACT_ADDRESS = "0x698981548FA15810FE9FE5f41e9D9713f5e5DECe";

export function useMint() {
  const [mintMessage, setMintMessage] = useState<string | null>(null);
  const [mintAmount, setMintAmount] = useState(1);
  const [isTxSuccess, setIsTxSuccess] = useState(false);
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const address = useAddress();
  const { contract, isLoading: isContractLoading } = useContract(
    mounted ? CONTRACT_ADDRESS : undefined,
    "edition-drop"
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMint = async (): Promise<void> => {
    setIsTxSuccess(false);
    setIsTxLoading(true);

    if (!address) {
      setMintMessage("⚠️ Connecte ton wallet d'abord.");
      setIsTxLoading(false);
      return;
    }
    
    if (!contract) {
      setMintMessage("⚠️ Contrat non initialisé...");
      setIsTxLoading(false);
      return;
    }
    
    // Vérifier que l'utilisateur est sur le bon réseau
    const currentChainId = await window.ethereum?.request({ method: 'eth_chainId' });
    if (currentChainId !== '0xaa36a7') { // 0xaa36a7 est l'ID de chaîne hexadécimal pour Sepolia
      setMintMessage("⚠️ Veuillez passer au réseau Sepolia Testnet");
      setIsTxLoading(false);
      return;
    }

    try {
      setMintMessage("⏳ Préparation de la transaction...");
      
      if (!contract) {
        throw new Error("Contrat non initialisé");
      }
      
      setMintMessage("⏳ Envoi de la transaction...");
      
      // Utilisation de la méthode claim standard
      const tx = await contract.claimTo(address, 0, mintAmount);
      
      setMintMessage("⏳ En attente de confirmation...");
      
      // Attendre la confirmation de la transaction
      const receipt = await tx.receipt;

      setMintMessage(`🎉 Mint réussi ! Tx: ${receipt.transactionHash.slice(0, 10)}...`);
      setIsTxSuccess(true);
      console.log("✅ Mint OK:", receipt);
    } catch (err: any) {
      console.error("❌ Mint error:", err);
      let errorMessage = "Échec du mint";
      
      // Gestion des erreurs courantes
      if (err.message.includes("user rejected")) {
        errorMessage = "Transaction annulée par l'utilisateur";
      } else if (err.message.includes("insufficient funds")) {
        errorMessage = "Fonds insuffisants pour la transaction";
      } else if (err.message.includes("wrong network")) {
        errorMessage = "Veuillez passer au réseau Sepolia Testnet";
      } else {
        errorMessage = err?.message || errorMessage;
      }
      
      setMintMessage(`❌ Erreur: ${errorMessage}`);
      return;
    } finally {
      setIsTxLoading(false);
    }
  };

  return {
    mintAmount,
    setMintAmount,
    handleMint,
    mintMessage,
    isContractLoading,
    isTxLoading,
    isTxSuccess,
    address,
  };
}

export function useClaim() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const address = useAddress();
  const network = useNetwork();
  
  useEffect(() => {
    if (network[0]?.data?.chain?.chainId !== Sepolia.chainId) {
      console.warn("Veuillez vous connecter au réseau Sepolia Testnet (ID: ", Sepolia.chainId, ")");
    }
  }, [network]);

  const { contract, isLoading: isContractLoading } = useContract(
    mounted ? CONTRACT_ADDRESS : undefined,
    "edition-drop"
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClaim = async (tokenId = 0, amount = 1) => {
    if (!contract || !address) return false;

    setIsLoading(true);
    try {
      const tx = await contract.claimTo(address, tokenId, amount);
      await tx.receipt;
      console.log("Claim successful!");
      return true;
    } catch (error) {
      console.error("Claim failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleClaim,
    isLoading: isLoading || isContractLoading,
    contract,
    address,
  };
}
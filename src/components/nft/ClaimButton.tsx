"use client";
import { Button } from "@/components/ui/button";
import { useClaim } from "@/hooks/contracts/claim";

interface ClaimButtonProps {
  tokenId?: number;
  amount?: number;
}

export default function ClaimButton({ tokenId = 0, amount = 1 }: ClaimButtonProps) {
  const { handleClaim, isLoading, contract, address } = useClaim();

  const onClaim = () => {
    handleClaim(tokenId, amount);
  };

  return (
    <Button
      onClick={onClaim}
      disabled={!contract || !address || isLoading}
    >
      {isLoading ? "Envoi..." : "Claim NFT"}
    </Button>
  );
}
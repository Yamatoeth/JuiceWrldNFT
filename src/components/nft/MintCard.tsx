import { ClaimButton } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { client } from "@/app/client";


export default function MintCard() {
  return (
    <div className="relative rounded-3xl bg-zinc-900/80 border border-zinc-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] p-8">
      <h2 className="text-4xl md:text-4xl font-extrabold tracking-wide text-white mb-8">
        JuiceWRLD NFT
      </h2>

      {/* Price panel */}
      <div className="mb-10">
        <div className="rounded-2xl bg-emerald-800/40 border border-emerald-600/40 p-3">
          <div className="rounded-xl bg-emerald-900/70 px-6 py-6 text-center">
            <p className="text-emerald-200 tracking-[0.25em] text-sm mb-2">SALE PRICE</p>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-300">FREE</p>
          </div>
        </div>
      </div>

      {/* Keep the ClaimButton exactly the same (no prop changes), only layout/styling around it */}
      <div className="flex justify-center gap-4">
        <ClaimButton
          contractAddress="0xc21F3546edc52a6676c9ea644e5b33dDaD1dE7b3"
          chain={sepolia}
          client={client}
          claimParams={{
            type: "ERC1155",
            quantity: 1n,
            tokenId: 0n,
          }}
          onError={(error) => {
            console.error("[ClaimButton] Error while claiming:", error);
          }}
          onTransactionSent={(tx) => {
            console.log("[ClaimButton] Transaction sent:", tx);
          }}
          onTransactionConfirmed={(receipt) => {
            console.log("[ClaimButton] Transaction confirmed:", receipt);
          }}
        >
          Claim
        </ClaimButton>
      </div>
    </div>
  );
}

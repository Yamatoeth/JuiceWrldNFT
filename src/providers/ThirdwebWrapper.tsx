"use client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { useEffect, useState } from "react";

// Utilisation de la configuration Sepolia standard de Thirdweb
const sepoliaConfig = Sepolia;

interface ThirdwebWrapperProps {
  children: React.ReactNode;
}

export default function ThirdwebWrapper({ children }: ThirdwebWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>{children}</div>;
  }

  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      activeChain={sepoliaConfig}
      supportedChains={[sepoliaConfig]}
      dAppMeta={{
        name: "Juice WRLD NFT",
        description: "Juice WRLD NFT Collection",
        url: "https://juicewrld-nft.vercel.app",
        logoUrl: "https://juicewrld-nft.vercel.app/images/logo.png"
      }}
      sdkOptions={{
        gasSettings: {
          maxPriceInGwei: 300, // Limite de prix du gaz
        },
        readonlySettings: {
          rpcUrl: `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
          chainId: 11155111,
        },
      }}
    >
      {children}
    </ThirdwebProvider>
  );
}
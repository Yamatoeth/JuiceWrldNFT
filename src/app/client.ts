import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Sepolia } from "@thirdweb-dev/chains";

export const sdk = new ThirdwebSDK(Sepolia, {
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});
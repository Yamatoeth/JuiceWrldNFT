import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/client";

export function WalletButton() {
  return (
    <ConnectButton
      client={client}
      theme="dark"
    />
  );
}
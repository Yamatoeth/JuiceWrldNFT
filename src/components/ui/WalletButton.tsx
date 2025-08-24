import { ConnectWallet } from "@thirdweb-dev/react";

export function WalletButton() {
  return (
    <ConnectWallet
      theme="dark"
      modalSize="compact"
    />
  );
}
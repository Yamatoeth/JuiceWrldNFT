"use client";
import { ThirdwebProvider } from "thirdweb/react";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function ThirdwebWrapper({ children }: Props) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
}

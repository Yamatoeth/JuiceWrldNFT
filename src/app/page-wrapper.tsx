"use client";
import NextDynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic import to avoid SSR issues
const DynamicMintApp = NextDynamic(() => import("./MintApp"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-xl">Chargement...</div>
    </div>
  ),
});

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    }>
      <DynamicMintApp />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";

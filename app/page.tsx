"use client";

import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";

const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  const { connected } = useWallet();

  return (
    <main className="hub-shell">
      <div className="hub-wrap">
        <h1 className="hub-title">OCTO HUB</h1>

        <p className="hub-sub">
          THE OFFICIAL MOBILE HUB FOR THE OCTO ECOSYSTEM.
          <br />
          BUILT FOR SOLANA & SOLANA MOBILE.
        </p>

        <div className="hub-actions">
          <div className="hub-wallet-wrap">
            <WalletMultiButton className="hub-secondary hub-wallet-btn" />
          </div>


         <button className="hub-secondary" type="button" disabled={!connected}>
            CLAIM REWARDS
          </button>

          <button className="hub-secondary" type="button">
            JOIN COMMUNITY
          </button>
        </div>

        <div className="hub-footer">POWERED BY SOLANA • OPTIMIZED FOR MOBILE</div>
      </div>
    </main>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";

const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
// OCTO mint (your token)
const OCTO_MINT = "3aY2hsjTqRSqQU1dbFGgvMKzeuUSos8inD876ZTFMsDe";

// SOL mint (native SOL on Solana)
const SOL_MINT = "So11111111111111111111111111111111111111112";

/**
 * Builds a Jupiter swap link that ALWAYS points to your OCTO mint.
 * You can optionally pass an amount in lamports (for SOL) or token base units.
 */
function getJupiterSwapUrl(opts?: {
  inputMint?: string;
  outputMint?: string;
  amount?: string; // keep as string to avoid unit confusion
}) {
  const inputMint = opts?.inputMint ?? SOL_MINT;
  const outputMint = opts?.outputMint ?? OCTO_MINT;

  const url = new URL("https://jup.ag/swap");
  url.searchParams.set("inputMint", inputMint);
  url.searchParams.set("outputMint", outputMint);

  if (opts?.amount) url.searchParams.set("amount", opts.amount);

  return url.toString();
}

export default function Home() {
  const { connected } = useWallet();
const onGetOcto = () => {
  window.open(getJupiterSwapUrl(), "_blank", "noopener,noreferrer");
};

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

<button
  className="hub-secondary"
  type="button"
  onClick={onGetOcto}
  disabled={!connected}
>
  GET $OCTO
</button>


         <a
  href="https://t.me/octobunnycoin"
  target="_blank"
  rel="noopener noreferrer"
  className="hub-secondary"
>
  JOIN COMMUNITY
</a>
<button
  className="hub-secondary"
  type="button"
  disabled={!connected}
  onClick={() => (window.location.href = "/rewards")}
>
  CLAIM REWARDS - COMING SOON
</button>


        </div>

        <div className="hub-footer">POWERED BY SOLANA • OPTIMIZED FOR MOBILE</div>
      </div>
    </main>
  );
}

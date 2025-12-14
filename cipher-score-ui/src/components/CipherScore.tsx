"use client";

import { useState } from "react";
import { ethers } from "ethers";
import CipherScoreABI from "../contracts/CipherScoreABI.json";
import { CIPHERSCORE_ADDRESS } from "../contracts/contractAddress";
import { useWallet } from "../hooks/useWallet";

import Header from "@/components/Header";
import InputCard from "@/components/InputCard";
import ResultPanel from "@/components/ResultPanel";
import PrivacyNotice from "@/components/PrivacyNotice";

export default function CipherScore() {
  const { address, connect, disconnect, connected } = useWallet();

  const [inputs, setInputs] = useState({
    x1: "",
    x2: "",
    x3: "",
    x4: "",
  });

  const [status, setStatus] = useState<
    "idle" | "pending" | "confirmed" | "error"
  >("idle");

  const [txHash, setTxHash] = useState<string | null>(null);

  // ✅ DEMO APPROVAL STATE (frontend only)
  const [approved, setApproved] = useState<boolean | null>(null);

  const APPROVAL_THRESHOLD = 10;

  // mock encryption (intentional)
  function encrypt(value: number): number {
    return value;
  }

  async function calculate() {
    try {
      if (!connected) {
        alert("Please connect your wallet first.");
        return;
      }

      // 🔹 DEMO APPROVAL LOGIC (matches your prompt)
      const sum =
        Number(inputs.x1 || 0) +
        Number(inputs.x2 || 0) +
        Number(inputs.x3 || 0) +
        Number(inputs.x4 || 0);

      setApproved(sum >= APPROVAL_THRESHOLD);

      const values = [
        encrypt(Number(inputs.x1 || 0)),
        encrypt(Number(inputs.x2 || 0)),
        encrypt(Number(inputs.x3 || 0)),
        encrypt(Number(inputs.x4 || 0)),
      ];

      const provider = new ethers.BrowserProvider(
        (window as any).ethereum
      );
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CIPHERSCORE_ADDRESS,
        CipherScoreABI,
        signer
      );

      setStatus("pending");
      setTxHash(null);

      // ✅ SEND TX (NO staticCall)
      const tx = await contract.calculateEncryptedScore(values);
      setTxHash(tx.hash);

      await tx.wait();
      setStatus("confirmed");
    } catch (err) {
      console.error("Calculate error:", err);
      setStatus("error");
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Header
        connected={connected}
        address={address}
        connect={connect}
        disconnect={disconnect}
      />

      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold">
          CipherScore
        </h1>
        <span className="rounded-full bg-slate-200 px-3 py-1 text-xs">
          Demo model
        </span>
      </div>

      <p className="text-slate-600 max-w-2xl">
        CipherScore demonstrates how private financial signals
        can be evaluated on-chain to produce an approval
        decision, without revealing user inputs.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <InputCard
          inputs={inputs}
          setInputs={setInputs}
          connected={connected}
          status={status}
          onCalculate={calculate}
          approvalThreshold={APPROVAL_THRESHOLD}
        />

        <ResultPanel
          status={status}
          txHash={txHash}
          approved={approved}
        />

        <PrivacyNotice />
      </div>
    </div>
  );
}

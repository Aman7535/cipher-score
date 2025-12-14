"use client";

import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const BASE_SEPOLIA_CHAIN_ID = "0x14A34"; // 84532

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  async function ensureBaseSepoliaNetwork() {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return false;
    }

    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (currentChainId === BASE_SEPOLIA_CHAIN_ID) {
      return true;
    }

    try {
      // Try switching to Base Sepolia
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BASE_SEPOLIA_CHAIN_ID }],
      });
      return true;
    } catch (switchError: any) {
      // Chain not added → add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: BASE_SEPOLIA_CHAIN_ID,
                chainName: "Base Sepolia Testnet",
                rpcUrls: ["https://sepolia.base.org"],
                nativeCurrency: {
                  name: "Ethereum",
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: [
                  "https://sepolia.basescan.org",
                ],
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error("Failed to add Base Sepolia:", addError);
          return false;
        }
      } else {
        console.error("Failed to switch network:", switchError);
        return false;
      }
    }
  }

  async function connect() {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed");
        return;
      }

      const networkOk = await ensureBaseSepoliaNetwork();
      if (!networkOk) {
        alert("Please switch to Base Sepolia Testnet");
        return;
      }

      const provider = new ethers.BrowserProvider(
        window.ethereum
      );
      const accounts = await provider.send(
        "eth_requestAccounts",
        []
      );

      setAddress(accounts[0]);
      setConnected(true);
    } catch (err) {
      console.error("Wallet connect error:", err);
    }
  }

  function disconnect() {
    setAddress(null);
    setConnected(false);
  }

  return {
    address,
    connected,
    connect,
    disconnect,
  };
}

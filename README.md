# CipherScore — Privacy-Preserving Credit Scoring using FHE

CipherScore is a demo application that showcases how sensitive financial inputs can be evaluated **on-chain** to produce an approval decision **without revealing user data**.

The project demonstrates privacy-preserving computation concepts inspired by **Fully Homomorphic Encryption (FHE)** and the **FHEVM model by Zama**.

---

## 🚀 Live Demo

👉 **Deployed on Base Sepolia (testnet)**  
👉 https://cipher-score-jade.vercel.app/

---

## 🧠 How It Works (High Level)

1. Users input private financial signals (0–10 scale):
   - Income stability  
   - Savings behavior  
   - Payment history  
   - Risk factor  
2. Inputs are **encrypted locally (demo model)**  
3. Encrypted values are sent to a smart contract  
4. The contract computes a **total score on-chain**  
5. If the total score is **≥ 10**, the user is approved  
6. Only the **final approval decision** is public  

> Individual inputs and intermediate calculations are **never revealed**.

---

## 🔐 Encryption Flow (End-to-End)

**Client-Side (User Browser)**
1. The user enters four numeric values (0–10):
Income stability
Savings behavior
Payment history
Risk factor

2. **These values are encrypted locally in the browser** using a **mock FHE-style encryption layer.**

> In a production FHEVM system, this step would use real FHE encryption via a Key Management System (KMS).
For this demo, encryption is simulated to focus on privacy-preserving computation flow.

3. The encrypted values are sent to the smart contract **— raw values are never stored on-chain.**

**On-Chain (Smart Contract)**
4. The smart contract receives **only encrypted inputs**

5. **It computes:**
An encrypted total score
An encrypted approval decision (approved / not approved)

6. The contract **never decrypts user inputs.**

7. Only the **final approval result** is exposed publicly.

> This mirrors how FHE-enabled contracts operate:
**compute on encrypted data, reveal only the final outcome.**

**Result**

User sees:
Total score
Approval status

Observers see:
Transaction hash
Approval result

**Inputs remain private**

---

## 🧠 Smart Contract Overview

CipherScore.sol — Core Logic

The CipherScore smart contract performs **privacy-preserving credit evaluation.**

**Inputs**

uint32[] encryptedInputs

Represents encrypted user signals

Each value corresponds to a financial metric

Contract does **not** know original values

**Computation**

The contract:
1. Iterates over encrypted inputs
2. Computes an encrypted total score
3. Applies a threshold rule:

If totalScore ≥ 10 → Approved
Else → Not Approved

**Outputs**

(uint32 score, bool approved)
score → encrypted / abstracted score
approved → final public decision
> The approval boolean is the **only meaningful public signal**

**Why This Matters**

This design demonstrates:
No raw financial data on-chain
Deterministic approval logic
Privacy-preserving computation pattern
Realistic FHEVM-style architecture

---

## ⚠️ Note on Mock Encryption

This demo uses **mock encryption** to:
Avoid complex KMS setup
Focus on architecture & UX
Demonstrate FHE-compatible flow

The **contract and frontend are structured** so that:
Real FHE encryption can be plugged in later
No architectural changes are required

---
## 🔐 Privacy Model (Demo)

- Raw inputs are **never stored**
- Only encrypted values are processed on-chain
- Only the final approval decision is public
- Designed as an **educational FHE-style demo**

---

## 🧩 Tech Stack

### 🧠 Smart Contracts
- Solidity (0.8.x)
- Hardhat
- Inspired by **FHEVM (Zama)**
- Deployed on **Base Sepolia**

### 🎨 Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ethers.js
- MetaMask integration

---

## 📂 Repository Structure

```
cipher-score/
├── cipher-score-ui/   # Next.js frontend (Vercel deployed)
├── contracts/         # Hardhat smart contracts (CipherScore logic)
└── README.md          # Project documentation

```
---

## 📥 Getting the Repository

Clone the repository and navigate into it:

```
git clone https://github.com/Aman7535/cipher-score.git
cd cipher-score
```
---

## 🛠️ Smart Contract Development (FHEVM Template)

This project is based on a Hardhat FHEVM development template inspired by Zama.

**Prerequisites**

**Node.js**: v20+

**npm / yarn / pnpm**


**Installation**
```
cd contracts
npm install
```
**Environment Variables**

This project uses a standard RPC-based Hardhat setup (no Infura required).

Create a `.env` file inside the `contracts/` folder:
```
PRIVATE_KEY=your_wallet_private_key
BASE_SEPOLIA_RPC_URL=https://base-sepolia-rpc.publicnode.com
ETHERSCAN_API_KEY=optional_for_verification
```

**⚠️ Never commit your private key.
The .env file is excluded via .gitignore.**

**Compile & Test**
```
npm run compile
npm run test
```
**Deploy Locally**
```
npx hardhat node
npx hardhat deploy --network localhost
```
**Deploy to Sepolia**
```
npx hardhat deploy --network sepolia
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

---

## 📚 References

FHEVM Documentation
https://docs.zama.ai/fhevm

FHEVM Solidity Guides
https://docs.zama.ai/protocol/solidity-guides

Zama GitHub
https://github.com/zama-ai



---

## ⚠️ Disclaimer

This project is a demo intended for educational purposes only.

It does not implement production-grade cryptography

It does not claim real financial security guarantees

Approval logic is intentionally simplified



---

## 👤 Author

Built by Aman
Privacy-preserving smart contract demo inspired by FHEVM concepts.

---

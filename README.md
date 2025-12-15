# CipherScore — Privacy-Preserving Credit Scoring using FHE

CipherScore is a demo application that showcases how sensitive financial inputs can be evaluated **on-chain** to produce an approval decision **without revealing user data**.

The project demonstrates privacy-preserving computation concepts inspired by Fully Homomorphic Encryption (FHE).

---

## 🚀 Live Demo
👉 _Deployed on Base Sepolia (testnet)_  
👉 cipher-score-jade.vercel.app

---

## 🧠 How It Works (High Level)

1. Users input private financial signals (0–10 scale)
   - Income stability
   - Savings behavior
   - Payment history
   - Risk factor
2. Inputs are **encrypted locally (demo model)**
3. Encrypted values are sent to a smart contract
4. The contract computes a total score **on-chain**
5. If the total score ≥ **10**, the user is approved
6. Only the **final approval decision** is public

> Individual inputs and intermediate calculations are never revealed.

---

## 🔐 Privacy Model (Demo)

- Raw inputs are never stored
- Only encrypted values are processed on-chain
- Only the final approval decision is public
- Designed as an educational FHE-style demo

---

## 🧩 Tech Stack

### Smart Contracts
- Solidity (0.8.x)
- Hardhat
- Deployed on **Base Sepolia**

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ethers.js
- MetaMask integration

---

## 📂 Repository Structure
```
contracts/ # Smart contracts + deployment scripts
└─ cipher-score-ui/
├─ src/
│ ├─ components/
│ ├─ hooks/
│ ├─ contracts/
│ └─ app/
└─ README.md

```
---

## ⚠️ Disclaimer

This project is a **demo** intended for educational purposes.  
It does **not** implement production-grade cryptography.

---

## 👤 Author
Built by **Aman**

import { ethers, network } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with", deployer.address);

  const CipherScore = await ethers.getContractFactory("CipherScore");
  console.log("Deploying CipherScore...");
  const c = await CipherScore.deploy();               // if constructor args add them
  await c.waitForDeployment?.();                      // ethers v6 may have waitForDeployment
  console.log("CipherScore deployed at:", c.target || c.address || c);

  // Write the deployed address to the frontend contractAddress file
  const outPath = path.join(__dirname, "..", "..", "frontend", "cipher-score-ui", "src", "contracts", "contractAddress.ts");
  const addr = c.target ?? c.address ?? c;
  const content = `export const CIPHERSCORE_ADDRESS = "${addr}";\n`;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, content);
  console.log("Wrote contract address to:", outPath);

  // Also write ABI JSON for frontend (optional)
  const abiOut = path.join(__dirname, "..", "..", "frontend", "cipher-score-ui", "src", "contracts", "CipherScoreABI.json");
  const artifact = await artifacts.readArtifact("CipherScore");
  fs.writeFileSync(abiOut, JSON.stringify(artifact.abi, null, 2));
  console.log("Wrote ABI to:", abiOut);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

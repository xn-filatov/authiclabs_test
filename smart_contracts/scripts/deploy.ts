import { ethers } from "hardhat";
import { deploySettings } from "./settings"

async function main() {
  const contract = await ethers.deployContract("DefaultNFT",
    [deploySettings.contractName, deploySettings.contractSymbol]);

  await contract.waitForDeployment();

  console.log(
    `DefaultNFT successfully deployed to ${contract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error("Deployment error: ", error);
  process.exitCode = 1;
});

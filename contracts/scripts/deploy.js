const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("AINFTCollection");
  await contract.waitForDeployment();

  // await hre.run("verify:verify", {
  //   address: contract.target
  // });
  
  console.log(
    `success! contract deployed to ${contract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
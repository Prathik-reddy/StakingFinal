const { ethers } = require("hardhat");

async function main() {
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.deployed();

  console.log("RewardToken contract deployed to:", rewardToken.address);
  let chicTokenAddress = "0xeC75F71C0E61CAA48EfA889ad2b541fDad91e33b";
  const Staking = await ethers.getContractFactory("staking");
  const staking = await Staking.deploy(chicTokenAddress,chicTokenAddress);
  await staking.deployed();

  console.log("Staking contract deployed to:", staking.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

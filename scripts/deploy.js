const { ethers } = require("hardhat");

async function main() {
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.deployed();

  console.log("RewardToken contract deployed to:", rewardToken.address);

  const Staking = await ethers.getContractFactory("staking");
  const staking = await Staking.deploy(rewardToken.address, rewardToken.address);
  await staking.deployed();

  console.log("Staking contract deployed to:", staking.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// RewardToken contract deployed to: 0xd1A34EA5AD295f4eD1BC51481084b17B689FaF7B
// Staking contract deployed to: 0x9897E168657806fF80D66F5c5B88766f15e1db4a
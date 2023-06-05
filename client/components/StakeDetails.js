import React, { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
import StakeForm from './StakeForm';
import WithdrawForm from './WithdrawForm';

function StakeDetails() {
  const { account, isWeb3Enabled } = useMoralis();
  const [ctBalance, setctBalance] = useState('0');
  const [stakedBalance, setStakedBalance] = useState('0');
  const [earnedBalance, setEarnedBalance] = useState('0');

  const stakingAddress = "0x27e09782DdD45e9f6BBc3C6ACF6a722D09eB5d63";
  const chicTokenAddress = "0xCe0c4324e9FFED0E151AfEb45d143095E8bE1471";

  const { runContractFunction: getctBalance } = useWeb3Contract({
    abi: TokenAbi.abi,
    contractAddress: chicTokenAddress,
    functionName: 'balanceOf',
    params: {
      account
    }
  });

  const { runContractFunction: getStakedBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'getStaked',
    params: {
      account
    }
  });

  const { runContractFunction: getEarnedBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'earned',
    params: {
      account
    }
  });

  const { runContractFunction: claimEarnedReward } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'claimReward',
  });

  const { runContractFunction: withdrawTokens } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'withdraw',
    params: {

    }
  });

  const claimReward = async (e) => {
    e.preventDefault();
    console.log("Executing tx ....");
    const tx = await claimEarnedReward({ onError: (error) => console.log(error) });
    console.log("Tx executed");
  }

  const withdraw = async (e) => {
    e.preventDefault();
    console.log("Executing tx ....");
    const tx = await claimEarnedReward({ onError: (error) => console.log(error) });
    // await tx.wait(0);
    console.log("Tx executed");
  }



  useEffect(() => {
    async function updateUiValues() {
      const ctBalance = (await getctBalance({ onError: (error) => console.log(error) })).toString();
      const formattedctBalance = parseFloat(ctBalance) / 1e18;
      const formattedRtBalaceRounded = formattedctBalance.toFixed(2);
      setctBalance(formattedRtBalaceRounded);

      const stakedBalace = (await getStakedBalance({ onError: (error) => console.log(error) })).toString();
      const formattedStakedBalance = parseFloat(stakedBalace) / 1e18;
      const formattedStakedBalanceRounded = formattedStakedBalance.toFixed(2);
      setStakedBalance(formattedStakedBalanceRounded);

      const earnedBalance = (await getEarnedBalance({ onError: (error) => console.log(error) })).toString();
      const formattedEarnedBalance = parseFloat(earnedBalance / 1e18);
      const formattedEarnedBalanceRounded = formattedEarnedBalance.toFixed(15);
      setEarnedBalance(formattedEarnedBalanceRounded);
    }

    if (isWeb3Enabled) updateUiValues();

  }, [account, stakedBalance, earnedBalance, getEarnedBalance, getctBalance, getStakedBalance, isWeb3Enabled]);
  return (
    <>
      <div className="h-full w-full bg-opacity-100 border border-gray-100">
        <div className="text-center w-9/12 m-auto my-10 rounded-xl border-4">
          <div className="border-b-2 border-neutral-100 px-6  dark:border-neutral-300 dark:text-neutral-50 m-auto text-3xl ">
            Stake Chic Tokens
          </div>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Chic Balance is: {ctBalance} CH
            </h5>
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Staked Balance is: {stakedBalance} CH
            </h5>
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Earned Balance is: {earnedBalance} CH
            </h5>
          </div>
          <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-300 dark:text-neutral-50">
            <div className="bg-dark shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
              <div className="-mx-3 md:flex mb-6">
                <StakeForm></StakeForm>
                <WithdrawForm></WithdrawForm>
              </div>
            </div>
            <div className="border-b-2 border-neutral-100  dark:border-neutral-300 dark:text-neutral-50 text-3xl mb-20"></div>

            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              You have Earned : {earnedBalance} CH till now.
            </h5>
            <button onClick={claimReward} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg hover:text-white dark:text-white">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-yellow-500 rounded-md group-hover:bg-opacity-0">
                Claim Reward
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StakeDetails;
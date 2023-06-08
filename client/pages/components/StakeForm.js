import React from 'react';
import { useWeb3Contract } from 'react-moralis';
import StakingAbi from '../../constants/Staking.json';
import TokenAbi from '../../constants/RewardToken.json';
import { Form } from 'web3uikit';
import { ethers } from 'ethers';

function StakeForm() {
  const stakingAddress = "0xC3ab35225f9Bb65d5534513cE21e68bd8E160017";
  const tesTokenAddress = "0xAE70e9751B17C9a1d88bF3362879aF576Ec5eB0a";

  const { runContractFunction } = useWeb3Contract();

  let approveOptions = {
    abi: TokenAbi.abi,
    contractAddress: tesTokenAddress,
    functionName: 'approve'
  };

  let stakeOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'stake'
  };

  async function handleStakeSubmit(data) {
    const amountToApprove = data.data[0].inputResult;
    approveOptions.params = {
      amount: ethers.utils.parseEther(amountToApprove, 'ether'),
      spender: stakingAddress
    };

    const tx = await runContractFunction({
      params: approveOptions,
      onError: (error) => console.log(error),
      onSuccess: () => {
        handleApproveSuccess(approveOptions.params.amount);
      }
    });
  }

  async function handleApproveSuccess(amountToStakeFormatted) {
    stakeOptions.params = {
      amount: amountToStakeFormatted
    };

    const tx = await runContractFunction({
      params: stakeOptions,
      onError: (error) => console.log(error)
    });

    // await tx.wait(0);
    console.log('Stake transaction complete');
  }

  return (
    <>
      <div className='text-black w-1/2 px-3 '>
        <Form className='flex flex-col justify-end'
          onSubmit={handleStakeSubmit}
          data={[
            {
              inputWidth: '100%',
              name: 'Amount to stake ',
              type: 'number',
              value: '',
              key: 'amountToStake'
            }
          ]}
          title="Stake Now!"
        ></Form>
      </div>
    </>
  );
}

export default StakeForm;
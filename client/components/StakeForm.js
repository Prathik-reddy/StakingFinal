import React from 'react';
import { useWeb3Contract } from 'react-moralis';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
import { Form } from 'web3uikit';
import { ethers } from 'ethers';

function StakeForm() {
  const stakingAddress = "0x68F6b2240448b6ac6FFaE2665D4a843c0108937E";
  const tesTokenAddress = "0xeC75F71C0E61CAA48EfA889ad2b541fDad91e33b";

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
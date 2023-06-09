import React from 'react';
import { useWeb3Contract } from 'react-moralis';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
import { Form } from 'web3uikit';
import { ethers } from 'ethers';

function WithdrawForm() {
  const stakingAddress = "0x68F6b2240448b6ac6FFaE2665D4a843c0108937E";
  const tesTokenAddress = "0xeC75F71C0E61CAA48EfA889ad2b541fDad91e33b";

  const { runContractFunction } = useWeb3Contract();

  let approveOptions = {
    abi: TokenAbi.abi,
    contractAddress: tesTokenAddress,
    functionName: 'approve'
  };

  let withdrawOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'withdraw'
  };

  async function handleWithdrawSubmit(data) {
    const amountToWithdraw = data.data[0].inputResult;
    approveOptions.params = {
      amount: ethers.utils.parseEther(amountToWithdraw, 'ether'),
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
    withdrawOptions.params = {
      amount: amountToStakeFormatted
    };

    const tx = await runContractFunction({
      params: withdrawOptions,
      onError: (error) => console.log(error)
    });

    // await tx.wait(0);
    console.log('Withdraw transaction complete');
  }

  return (
    <>
      <div className='text-black w-1/2 mt-2 lg:mt-0 px-3' >
        <Form className='flex flex-col justify-end'
          onSubmit={handleWithdrawSubmit}
          data={[
            {
              inputWidth: '100%',
              name: 'Amount to withdraw ',
              type: 'number',
              value: '',
              key: 'amountToWithdraw'
            }
          ]}
          title="Withdraw Now!"
        ></Form>
      </div>
    </>
  );
}

export default WithdrawForm;
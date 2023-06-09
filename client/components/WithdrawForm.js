import React from 'react';
import { useWeb3Contract } from 'react-moralis';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
import { Form } from 'web3uikit';
import { ethers } from 'ethers';

function WithdrawForm() {
  const stakingAddress = "0xf1b6D2f3b7b593aF5446b3b1B82015a700bDAE28";
  const tesTokenAddress = "0xCe0c4324e9FFED0E151AfEb45d143095E8bE1471";

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
      {/* <div className="md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="grid-first-name"
        >
          Enter amount to withdraw
        </label>
        <input
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 text-black"
          id="grid-first-name"
          type="number"
          min="0"
          placeholder="Eg : 2.5 ETH"
        />
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            WithDraw Tokens
          </span>
        </button>
      </div> */}

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
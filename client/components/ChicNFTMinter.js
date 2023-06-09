import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import TokenAbi from "../constants/RewardToken.json";
import ChicAbi from "../constants/ChicBoxNFT.json";
import { ethers } from "ethers";
import { NotificationManager } from "react-notifications";
import { BigNumber } from "ethers";
import axios from "axios";

const ChicNFTMinter = () => {
  const { account, isWeb3Enabled } = useMoralis();
  const [mintingAddress, setMintingAddress] = useState("");

  const [tokensOwned, setTokensOwned] = useState([]);

  const chicNftAddress = "0xee3B2E7Fc526Cb1151ED7F9699A1Dac07250617d";
  const chicTokenAddress = "0xeC75F71C0E61CAA48EfA889ad2b541fDad91e33b";

  const { runContractFunction: getCtBalance } = useWeb3Contract({
    abi: TokenAbi.abi,
    contractAddress: chicTokenAddress,
    functionName: "balanceOf",
    params: {
      account: mintingAddress,
    },
  });

  const { runContractFunction: safeMint } = useWeb3Contract({
    abi: ChicAbi.abi,
    contractAddress: chicNftAddress,
    functionName: "safeMint",
    params: {
      _to: mintingAddress,
    },
  });

  const { runContractFunction: tokenURI } = useWeb3Contract({});

  const { runContractFunction: ownerOf } = useWeb3Contract();

  const { runContractFunction: getTokenCount } = useWeb3Contract({
    abi: ChicAbi.abi,
    contractAddress: chicNftAddress,
    functionName: "getTokenCounter",
  });

  const fetchUserTokens = async () => {
    const tokenCount = await getTokenCount();
    let idx = 0;

    let userTokens = [];
    for (let i = 0; i < tokenCount.toNumber(); i++) {
      const ownerOfCallParams = {
        abi: ChicAbi.abi,
        contractAddress: chicNftAddress,
        functionName: "ownerOf",
        params: {
          tokenId: i,
        },
      };

      const owner = await ownerOf({ params: ownerOfCallParams });

      //   console.log(owner, account);

      if (owner.toLowerCase() == account.toLowerCase()) {
        const { description, image } = await getTokenMetadata(i);
        userTokens.push({
          idx: idx++,
          token: i,
          description: description,
          image: image,
        });
      }
    }

    setTokensOwned((tokensOwned) => userTokens);
  };

  useEffect(() => {
    if (account && ethers.utils.isAddress(account)) {
      fetchUserTokens();
    }
  }, [account, isWeb3Enabled]);

  const handleMint = async () => {
    if (mintingAddress && ethers.utils.isAddress(mintingAddress)) {
      const chicTokenBalance = await getCtBalance({
        onError: (error) =>
          NotificationManager.error(error.message, "Execution error", 5000),
      });

      if (chicTokenBalance.gte(ethers.utils.parseEther("1"))) {
        NotificationManager.info("Minting CHIC NFT", "Hang on!!", 3000);
        const tx = await safeMint({
          onError: (error) =>
            NotificationManager.error(error.message, "Execution error", 5000),
        });
        await tx.wait();
        NotificationManager.success(
          `Your CHIC NFT has been successfully minted to ${mintingAddress.slice(
            0,
            10
          )}...`,
          "Success",
          3000
        );

        await fetchUserTokens();
      } else {
        NotificationManager.warning(
          "The address must have atleast 1 CHIC.",
          "Insufficient CHIC Balance",
          3000
        );
      }
    } else {
      NotificationManager.warning(
        "Please enter a valid minting address.",
        "Invalid Address",
        3000
      );
    }
  };

  const getTokenMetadata = async (id) => {
    const tokenURICallOptions = {
      abi: ChicAbi.abi,
      contractAddress: chicNftAddress,
      functionName: "tokenURI",
      params: {
        _tokenId: id,
      },
    };

    const uri = await tokenURI({ params: tokenURICallOptions });
    // console.log(uri);

    const { data: metadata } = await axios.get(uri);
    console.log(metadata);

    return metadata;
  };

  return (
    <div className="p-3">
      <div className="m-1">
        <div className="grid grid-cols-2" >
          {tokensOwned.length > 0 ? (
            tokensOwned.map((token) => (
              <div key={token.token}>
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  TokenId: {token.token}
                </h5>
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  {`Description: ${token.description}`}
                </h5>
                <img
                  src={token.image}
                  height="400px"
                  width="400px"
                  className="rounded-lg mx-auto"
                />
                <br />
              </div>
            ))
          ) : (

            <>
            <div>
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                You don't have any NFT's . Mint one right now!
              </h5>
            </div>
            <div>
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Please mint your dNft now.
              </h5>
            </div>
            </>

          )}
        </div>
      </div>
      <hr />
      <div>
        <h5 className="my-8 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          Want to Mint dNFT?
        </h5>
        <input
          className="mx-4 p-3 rounded-lg"
          type="text"
          placeholder="Minting address here"
          onChange={(e) => {
            setMintingAddress(e.target.value);
          }}
        />
        <button
          className="bg-purple-400 rounded-lg p-3"
          onClick={async () => {
            await handleMint();
          }}
        >
          Mint dNFT
        </button>
      </div>
    </div>
  );
};

export default ChicNFTMinter;

import React from 'react';
import { ConnectButton } from 'web3uikit';
import Image from 'next/image';
function Header() {
  return (
    <>
     <nav className="border-gray-200 bg-gray-900 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a className="flex items-center">
          <Image
          src="/images/token.png" width={50}
          height={50}
          alt="token image"/>
            <span className="self-center text-2xl font-semibold whitespace-nowra text-white px-2">
              Stake & Mint
            </span>
          </a>
          <div className="flex items-center">
              <ConnectButton moralisAuth={false}  />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
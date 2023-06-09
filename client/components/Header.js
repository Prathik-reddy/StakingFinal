import React from 'react';
import { ConnectButton } from 'web3uikit';
import Image from 'next/image';
function Header() {
  return (
    <>
     <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a className="flex items-center">
          <Image
          src="/images/token.png" width={50}
          height={50}
          alt="token image"/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white px-2">
              Damana Studio
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
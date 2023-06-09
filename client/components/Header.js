import React from 'react';
import { ConnectButton } from 'web3uikit';
import Image from 'next/image';
import Link from 'next/link';
function Header() {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a className="flex items-center">
            <Image
              src="/images/token.png" width={50}
              height={50}
              alt="token image" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white px-2">
              Stake Chic Tokens
            </span>
          </a>
          <div className="flex items-center">
            <ConnectButton moralisAuth={false} />
          </div>
        </div>
      </nav>
      {/* <nav className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
              </li>
              <li>
                <a href="" className="text-gray-900 dark:text-white hover:underline">Company</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white hover:underline">Team</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white hover:underline">Features</a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
}

export default Header;
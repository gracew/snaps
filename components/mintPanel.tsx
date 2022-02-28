import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Fragment } from 'react';
import { AuthType, getWeb3Modal } from '../auth';
import { spcTypes } from '../pages/give/[id]/category';
import { definitions } from '../types/supabase';
import PrimaryButton from './primaryButton';


interface MintPanelProps {
  snaps: definitions["snaps"];
  me: any;
  open: boolean;
  onClose: () => void;
}

// TODO: properly direct user in all of these scenarios
export default function MintPanel({ snaps, me, open, onClose }: MintPanelProps) {
  function getDescription() {
    return `To: ${snaps?.recipient_fname}
    
    ${snaps?.note}`;
  }

  const category = spcTypes.find(c => c.id === snaps?.category);

  async function mintNFT() {
  }

  function getInnerComponent() {
    if (!me?.sub) {
      // not logged in
      if (snaps.recipient_type === AuthType.ADDRESS) {
        return <>
          If you own the Polygon address that this collectible was sent to, connect your wallet to claim.
        </>
      } else {
        return <>
          If you own the email address that this collectible was sent to, log in with Google to claim.
        </>
      }
    } else if (me.address) {
      if (snaps.recipient_type === AuthType.ADDRESS) {
        if (me.address.toLowerCase() === snaps.recipient_wallet_address?.toLowerCase()) {
          return <PrimaryButton text="Mint as NFT" onClick={mintNFT} />;
        } else {
          return <>
            If you own the email address that this collectible was sent to, log in with Google to claim.
          </>
        }
      }
    } else if (me.email) {
      if (snaps.recipient_type === AuthType.ADDRESS) {
        return <>
          If you own the Polygon address that this collectible was sent to, connect your wallet to claim.
        </>
      } else {
        return <>
          In order to claim this collectible, you'll need to connect a crypto wallet. If you don't have one yet, we recommend <a href="https://metamask.io/download/">MetaMask</a>.
        </>
      }
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={onClose}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="pointer-events-none fixed inset-x-0 bottom-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <div className="pointer-events-auto relative w-screen">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-col items-center bg-white px-4 py-6 shadow-xl">
                  <div className="w-96 flex flex-col">
                    <Dialog.Title className="text-lg font-medium text-gray-900">Claim Collectible</Dialog.Title>
                    <div className="relative mt-6 flex-1">
                      {getInnerComponent()}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog >
    </Transition.Root >
  )
}
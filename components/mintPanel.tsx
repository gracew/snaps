import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { AuthType, connect, walletLogin } from '../auth';
import { definitions } from '../types/supabase';
import GoogleButton from './googleButton';
import MintPanelContents from './mintPanelContents';
import PrimaryButton from './primaryButton';

interface MintPanelProps {
  snaps: definitions["snaps"];
  me: any;
  open: boolean;
  onClose: () => void;
  refresh: () => void;
}

export default function MintPanel({ snaps, me, open, onClose, refresh }: MintPanelProps) {
  async function mintNFT() {
    // TODO: call backend
  }

  async function onClickConnect() {
    const res = await connect();
    const success = await walletLogin(res);
    if (success) {
      refresh();
    }
    // TODO: handle failure case
  }

  function getInnerComponent() {
    const connectWallet = (
      <MintPanelContents
        text="If you own the Polygon address that this collectible was sent to, connect your wallet to claim."
      >
        <PrimaryButton text="Connect Wallet" onClick={onClickConnect} />
      </MintPanelContents>
    );
    const connectEmail = (
      <MintPanelContents
        text="If you own the email address that this collectible was sent to, log in with Google to claim."
      >
        <GoogleButton />
      </MintPanelContents>
    );

    if (!me?.sub) {
      // not logged in
      if (snaps.recipient_type === AuthType.ADDRESS) {
        return connectWallet;
      } else {
        return connectEmail;
      }
    } else if (me.address) {
      if (snaps.recipient_type === AuthType.ADDRESS) {
        if (me.address.toLowerCase() === snaps.recipient_wallet_address?.toLowerCase()) {
          return (
            <MintPanelContents
              text="This won't cost you any transaction fees."
            >
              <PrimaryButton text="Claim as NFT" onClick={mintNFT} />
            </MintPanelContents>
          );
        } else {
          return connectEmail;
        }
      }
    } else if (me.email) {
      if (snaps.recipient_type === AuthType.ADDRESS) {
        return connectWallet;
      } else {
        return (
          <div className="flex flex-col pb-3">
            <div className="mb-4">
              In order to claim this collectible, you'll need to connect a crypto wallet. If you don't have one yet, we recommend <a href="https://metamask.io/download/">MetaMask</a>.
            </div>
            <PrimaryButton text="Connect Wallet" onClick={onClickConnect} />
          </div>
        )

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

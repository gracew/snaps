import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthType, connect, shortenAddress, walletLogin } from '../../auth';
import Card from '../../components/card';
import GoogleButton from '../../components/googleButton';
import LargeSpinner from '../../components/largeSpinner';
import MintPanel from '../../components/mintPanel';
import MintPanelContents from '../../components/mintPanelContents';
import Nav from '../../components/nav';
import PrimaryButton from '../../components/primaryButton';
import SecondaryButton from '../../components/secondaryButton';
import { supabase } from '../api/supabase';
import { spcTypes } from '../give/[id]/category';
import { UserContext } from '../_app';

const GiveCategory: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [snaps, setSnaps] = useState<any>();
  const [copied, setCopied] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [me, setMe] = useContext(UserContext);

  async function getMe() {
    return fetch('/api/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then(setMe);
  };

  useEffect(() => {
    async function getExistingData() {
      const { data, error } = await supabase
        .rpc('get_snaps_with_sender', { snaps_id: id });
      // TODO: handle error case
      if (!error && data && data.length > 0) {
        setSnaps(data[0]);
      }
    }

    getExistingData();
  }, [id]);

  async function copy() {
    const host = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
    await navigator.clipboard.writeText(`${host}${router.asPath}`);
    setCopied(true);
  }

  async function mintNFT() {
    fetch('/api/mint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(setSnaps);
  }

  async function onClickConnect() {
    const res = await connect();
    await walletLogin(res);
    getMe();
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
      if (snaps!.recipient_type === AuthType.ADDRESS) {
        return connectWallet;
      } else {
        return connectEmail;
      }
    } else if (me.address) {
      if (snaps!.recipient_type === AuthType.ADDRESS) {
        if (me.address.toLowerCase() === snaps!.recipient_wallet_address?.toLowerCase()) {
          return (
            <MintPanelContents
              text="This won't cost you any transaction fees."
            >
              <PrimaryButton text="Claim as NFT" onClick={mintNFT} />
            </MintPanelContents>
          );
        }
      } else {
        return connectEmail;
      }
    } else if (me.email) {
      if (snaps!.recipient_type === AuthType.ADDRESS) {
        return connectWallet;
      } else {
        return (
          <div className="flex flex-col pb-3">
            <div className="mb-4">
              In order to claim this collectible, you&apos;ll need to connect a crypto wallet. If you don&apos;t have one yet, we recommend <a href="https://metamask.io/download/">MetaMask</a>.
            </div>
            <PrimaryButton text="Connect Wallet" onClick={onClickConnect} />
          </div>
        )
      }
    }
  }

  const category = spcTypes.find(c => c.id === snaps?.category);

  if (!snaps) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <LargeSpinner />
      </div>
    );
  }

  const inner = getInnerComponent();
  const claimable = !snaps.claimed &&
    (!me || me.sub.toLowerCase() !== snaps.sender_id.toLowerCase()) &&
    inner !== undefined;

  console.log("me " + me?.sub);
  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="w-96 flex flex-col">
        <Nav />
        <div className="mt-5 mb-3 flex justify-between">
          {/* TODO: look up ENS */}
          <h2>From:
            <div>
              {snaps.sender_fname || shortenAddress(snaps.sender_wallet_address)}
            </div>
          </h2>
          <h2 className="text-right">To:
            <div>
              {snaps.recipient_fname || shortenAddress(snaps.recipient_wallet_address)}
            </div>
          </h2>
        </div>

        <Card
          onClick={() => { }}
          imageUrl={category?.image!}
          label={category?.label!}
          description={snaps?.note!}
        />

        {!claimable &&
          <PrimaryButton
            className="my-3"
            onClick={copy}
            text={copied ? "Copied!" : "Share"}
          />}
        {claimable &&
          <>
            <PrimaryButton
              className="my-3"
              onClick={() => setShowPanel(true)}
              text="Claim"
            />
            <SecondaryButton
              onClick={copy}
              text={copied ? "Copied!" : "Share"}
            />
          </>
        }
        <MintPanel
          snaps={snaps}
          open={showPanel}
          onClose={() => setShowPanel(false)}
        >
          {inner}
        </MintPanel>
      </div>
    </div>
  )
}

export default GiveCategory;

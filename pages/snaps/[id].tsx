import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Card from '../../components/card';
import LargeSpinner from '../../components/largeSpinner';
import MintPanel from '../../components/mintPanel';
import Nav from '../../components/nav';
import PrimaryButton from '../../components/primaryButton';
import SecondaryButton from '../../components/secondaryButton';
import { definitions } from "../../types/supabase";
import { supabase } from '../api/supabase';
import { spcTypes } from '../give/[id]/category';


const GiveCategory: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [snaps, setSnaps] = useState<definitions["snaps"]>();
  const [me, setMe] = useState<any>();
  const [copied, setCopied] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    async function getExistingData() {
      const { data, error } = await supabase
        .from<definitions["snaps"]>("snaps")
        .select("*")
        .eq("id", id as string);
      if (!error && data && data.length > 0) {
        setSnaps(data[0]);
      }
    }

    async function getMe() {
      const meRes = await fetch('/api/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}),
      })
        .then(res => res.json())
      setMe(meRes);
    };

    getExistingData();
    getMe();
  }, [id]);

  async function copy() {
    const host = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
    await navigator.clipboard.writeText(`${host}${router.asPath}`);
    setCopied(true);
  }

  const category = spcTypes.find(c => c.id === snaps?.category);

  if (!snaps) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <LargeSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="w-96 flex flex-col">
        <Nav />
        <div className="mt-5 mb-3 flex justify-between">
          {/* TODO: look up ENS */}
          <h2>From: <div className="w-20 truncate">{me?.fname || me?.address}</div></h2>
          <h2 className="text-right">To: <div className="w-20 truncate">{snaps.recipient_fname || snaps.recipient_wallet_address}</div></h2>
        </div>

        <Card
          onClick={() => { }}
          imageUrl={category?.image!}
          label={category?.label!}
          description={snaps?.note!}
        />

        {me.sub === snaps.sender_id &&
          <PrimaryButton
            className="my-3"
            onClick={copy}
            text={copied ? "Copied!" : "Share"}
          />}
        {!me || me.sub !== snaps.sender_id &&
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
        <MintPanel snaps={snaps} me={me} open={showPanel} onClose={() => setShowPanel(false)} />
      </div>
    </div>
  )
}

export default GiveCategory;

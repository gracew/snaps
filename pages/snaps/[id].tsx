import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Card from '../../components/card';
import Nav from '../../components/nav';
import { definitions } from "../../types/supabase";
import { supabase } from '../api/supabase';
import { spcTypes } from '../give/[id]/category';

const GiveCategory: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [snaps, setSnaps] = useState<definitions["snaps"]>();
  const [copied, setCopied] = useState(false);

  // TODO: add claim button if not signed in as sender

  useEffect(() => {
    async function getExistingData() {
      const { data, error } = await supabase
        .from<definitions["snaps"]>("snaps")
        .select("*")
        .eq("id", id as string);
      if (!error && data && data.length > 0) {
        setSnaps(data[0]);
      }
    };

    getExistingData();
  }, [id]);

  async function copy() {
    const host = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
    await navigator.clipboard.writeText(`${host}/${router.asPath}`);
    setCopied(true);
  }

  const category = spcTypes.find(c => c.id === snaps?.category);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-96 flex flex-col">
        <Nav />
        <div className="mt-5 mb-3 flex justify-between">
          <h2>From: Grace</h2>
          {/* TODO: look up ENS */}
          <h2>To: {snaps?.recipient_fname || snaps?.recipient_wallet_address}</h2>
        </div>

        <Card
          onClick={() => { }}
          imageUrl={category?.image!}
          label={category?.label!}
          description={snaps?.note!}
        />

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-6 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={copy}
        >{copied ? "Copied!" : "Share"}</button>
      </div>
    </div>
  )
}

export default GiveCategory;

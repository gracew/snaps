import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ButtonContainer from '../../../components/buttonContainer';
import Nav from '../../../components/nav';
import PrimaryButton from '../../../components/primaryButton';
import LargeSpinner from '../../../components/largeSpinner';
import { definitions } from "../../../types/supabase";
import { supabase } from '../../api/supabase';

const GiveNote: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [snaps, setSnaps] = useState<definitions["snaps"]>();
  const [note, setNote] = useState<string>();
  const [loading, setLoading] = useState(false);

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

  async function onFinish() {
    setLoading(true);
    await supabase
      .from<definitions["snaps"]>("snaps")
      .update({ note })
      .eq('id', id as string);
    setLoading(false);
    router.push(`/snaps/${id}`);
  }

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
        <h1 className="text-2xl font-bold mt-5 mb-3">
          Give Snaps
        </h1>
        {/* TODO: look up ENS */}
        <h2 className="my-2">Write a note of appreciation for {snaps?.recipient_fname || snaps?.recipient_wallet_address}!</h2>

        <div className="mt-1 relative rounded-md shadow-sm">
          <textarea
            name="note"
            id="note"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <ButtonContainer>
          <PrimaryButton
            text="Finish"
            onClick={onFinish}
            disabled={!note}
            loading={loading}
          />
        </ButtonContainer>
      </div>
    </div>
  )
}

export default GiveNote;

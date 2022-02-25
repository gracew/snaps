import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SnapsRecipient from '../../../components/snapsRecipient';
import { supabase } from '../../api/supabase';
import { definitions } from "../../../types/supabase";
import LargeSpinner from '../../../components/largeSpinner';

const GiveToEdit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [snaps, setSnaps] = useState<definitions["snaps"]>();

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

  if (!snaps) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
          <LargeSpinner />
      </div>
    );
  }

  return (
    <SnapsRecipient existingData={snaps} />
  )
}

export default GiveToEdit;

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { shortenAddress } from '../../auth';
import LargeSpinner from '../../components/largeSpinner';
import MinimalCard from '../../components/minimalCard';
import Nav from '../../components/nav';
import PrimaryButton from '../../components/primaryButton';
import { definitions } from '../../types/supabase';
import { supabase } from '../api/supabase';
import { spcTypes } from '../give/[id]/category';
import { UserContext } from '../_app';

enum Tab {
  GIVEN = "given",
  RECEIVED = "received",
}

const Snaps: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [given, setGiven] = useState<definitions["snaps"][]>([]);
  const [received, setReceived] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState(Tab.GIVEN);
  const [me, setMe] = useContext(UserContext);

  useEffect(() => {
    async function getGiven() {
      if (!me?.sub) {
        return;
      }

      const { data, error } = await supabase
        .from<definitions["snaps"]>("snaps")
        .select("*")
        .eq("sender_id", me.sub);
      if (!error && data && data.length > 0) {
        setGiven(data);
      }
    };

    async function getReceived() {
      if (!me?.sub) {
        return;
      }

      const { data, error } = await supabase
        .rpc('get_received_snaps_with_sender', { recipient_email: me.email, recipient_wallet_address: me.address });
      if (!error && data && data.length > 0) {
        setReceived(data);
      }
    };

    Promise.all([getGiven(), getReceived()]).then(() => setLoading(false));
  }, [me]);

  function classNames(tab: Tab) {
    if (tab === currentTab) {
      return "inline-block p-4 text-sm font-medium text-center text-blue-500 rounded-t-lg border-b-2 border-blue-500 active cursor-pointer";
    } else {
      return "inline-block p-4 text-sm font-medium text-center text-gray-400 rounded-t-lg border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300 cursor-pointer";
    }
  }

  const hideGiveSnapsInNav = given.length === 0;

  return (
    <div className="w-96 my-4 flex flex-col">
      <Nav hideGiveSnaps={hideGiveSnapsInNav} />
      <div className="border-b border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <a onClick={() => setCurrentTab(Tab.GIVEN)} className={classNames(Tab.GIVEN)}>
              Snaps Given
            </a>
          </li>
          <li className="mr-2">
            <a onClick={() => setCurrentTab(Tab.RECEIVED)} className={classNames(Tab.RECEIVED)}>
              Snaps Received
            </a>
          </li>
        </ul>
      </div>
      {loading && (
        <div className="flex flex-col min-h-screen items-center justify-center">
          <LargeSpinner />
        </div>
      )}
      {!loading && currentTab === Tab.GIVEN && hideGiveSnapsInNav && (
        <div className='bg-gray-800 rounded-lg my-5 px-5 py-3'>
          You haven&apos;t given any Snaps yet. Try sending one now 😊
          <div className="flex flex-col my-3 items-center">
            <PrimaryButton
              text="Give Snaps"
              onClick={() => router.push("/give")}
            />
          </div>
        </div>
      )}
      {!loading && currentTab === Tab.GIVEN && !hideGiveSnapsInNav && (
        <div className='my-5 py-3 grid grid-cols-2 gap-3'>
          {given.map(snaps => {
            const category = spcTypes.find(c => c.id === snaps.category);
            const secondaryLabel = `To: ${snaps.recipient_fname || shortenAddress(snaps.recipient_wallet_address!)}`;
            console.log(category);
            return (
              <MinimalCard
                key={snaps.id}
                onClick={() => router.push(`/snaps/${snaps.id}`)}
                imageUrl={category?.image!}
                label={category?.label!}
                secondaryLabel={secondaryLabel}
                hover={true}
              />
            )
          })}
        </div>
      )}

      {!loading && currentTab === Tab.RECEIVED && received.length === 0 && (
        <div className='bg-gray-800 rounded-lg my-5 px-5 py-3'>
          You haven&apos;t received any Snaps yet. Check back later!
        </div>
      )}
      {!loading && currentTab === Tab.RECEIVED && received.length > 0 && (
        <div className='my-5 py-3 grid grid-cols-2 gap-3'>
          {received.map((snaps: any) => {
            const category = spcTypes.find(c => c.id === snaps.category);
            const secondaryLabel = `From: ${snaps.sender_fname || shortenAddress(snaps.sender_wallet_address)}`;
            return (
              <MinimalCard
                key={snaps.id}
                onClick={() => router.push(`/snaps/${snaps.id}`)}
                imageUrl={category?.image!}
                label={category?.label!}
                secondaryLabel={secondaryLabel}
                hover={true}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Snaps;

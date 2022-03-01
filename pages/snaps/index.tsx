import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Nav from '../../components/nav';
import PrimaryButton from '../../components/primaryButton';

enum Tab {
  GIVEN = "given",
  RECEIVED = "received",
}

const Snaps: NextPage = () => {
  const router = useRouter();
  const [given, setGiven] = useState([]);
  const [received, setReceived] = useState([]);
  const [currentTab, setCurrentTab] = useState(Tab.GIVEN);

  function classNames(tab: Tab) {
    if (tab === currentTab) {
      return "inline-block p-4 text-sm font-medium text-center text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 cursor-pointer";
    } else {
      return "inline-block p-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer";
    }
  }

  const hideGiveSnapsInNav = given.length === 0;

  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="w-96 my-4 flex flex-col">
        <Nav hideGiveSnaps={hideGiveSnapsInNav} />
        <div className="border-b border-gray-200 dark:border-gray-700">
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
        {currentTab === Tab.GIVEN && hideGiveSnapsInNav && (
          <div className='bg-gray-100 rounded-lg my-5 px-5 py-3'>
            You haven't given any snaps yet. Try sending one now 😊
            <div className="flex flex-col my-3 items-center">
              <PrimaryButton
                text="Give Snaps"
                onClick={() => router.push("/give")}
              />
            </div>
          </div>
        )}
        {currentTab === Tab.RECEIVED && received.length === 0 && (
          <div className='bg-gray-100 rounded-lg my-5 px-5 py-3'>
            You haven't received any snaps yet. Check back later!
            </div>
        )}
      </div>
    </div>
  )
}

export default Snaps;

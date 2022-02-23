import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const GiveCategory: NextPage = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  // TODO: fetch sender, recipient from DB
  // TODO: add claim button if not signed in as sender

  async function copy() {
    const host = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
    await navigator.clipboard.writeText(`${host}/${router.asPath}`);
    setCopied(true);
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-96 flex flex-col">
        <div className="mt-5 mb-3 flex justify-between">
          <h2>From: Grace</h2>
          <h2>To: Helena</h2>
        </div>

        <video
          src="https://s3.us-west-1.amazonaws.com/100t-lcs-nft.commemorative.assets.prod/100T%20Chain%20Card_square_LargePrint.mp4"
          autoPlay
          loop
        />
        <h2 className="text-xl font-semibold mt-4 mb-2">Selflessness</h2>
        <p>
          I appreciate how you always make time to listen to my concerns! Thank you 😊
        </p>

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

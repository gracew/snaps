import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const GiveNote: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-96 flex flex-col">
        <h1 className="text-2xl font-bold mt-5 mb-3">
          Give Snaps
        </h1>
        <h2 className="my-2">Write a note of appreciation for Helena!</h2>

        <div className="mt-1 relative rounded-md shadow-sm">
          <textarea
            name="note"
            id="note"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            rows={5}
          />
        </div>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-6 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Finish</button>
      </div>
    </div>
  )
}

export default GiveNote;

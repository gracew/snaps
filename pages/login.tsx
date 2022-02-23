import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const GiveTo: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-96 flex flex-col">
        <h1 className="text-2xl font-bold mt-5 mb-3">
          Log In
        </h1>
        <button
          type="button"
          className="px-5 py-2.5 mt-3 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Log In with Google
        </button>
        <div className="text-center text-sm uppercase">
          or
        </div>
        <button
          type="button"
          className="px-5 py-2.5 mt-3 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  )
}

export default GiveTo;

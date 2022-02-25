import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Nav from '../../components/nav';

const Snaps: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="w-96 my-4 flex flex-col">
        <Nav />
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <a href="#" className="inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500" aria-current="page">
                Snaps Received
              </a>
            </li>
            <li className="mr-2">
              <a href="#" className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">
                Snaps Given
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Snaps;

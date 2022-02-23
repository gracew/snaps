import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-96 flex flex-col">
        <h1 className="text-2xl font-bold mt-5 mb-3">
          Give Snaps
        </h1>

        <h2 className="my-2">Who are you sending to?</h2>

        <label className="block text-sm font-medium text-gray-700 mt-3">First Name</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            name="fname"
            id="fname"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <label className="block text-sm font-medium text-gray-700 mt-3">Email</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            name="email"
            id="email"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-6 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Next</button>
      </div>
    </div>
  )
}

export default Home

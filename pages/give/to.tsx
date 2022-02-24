import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ButtonContainer from '../../components/buttonContainer';
import Or from '../../components/or';
import PrimaryButton from '../../components/primaryButton';
import SecondaryButton from '../../components/secondaryButton';

const GiveTo: NextPage = () => {
  const router = useRouter();
  const [recipientType, setRecipientType] = useState<string>();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-96 flex flex-col">
        <h1 className="text-2xl font-bold mt-5 mb-3">
          Give Snaps
        </h1>
        <h2 className="my-2">Who are you sending to?</h2>

        {!recipientType && <div className="flex flex-col">
          <PrimaryButton
            text="Email"
            onClick={() => setRecipientType("email")}
          />
          <Or />
          <PrimaryButton
            text="Polygon Address"
            onClick={() => setRecipientType("address")}
          />
        </div>}

        {recipientType === "email" && <div>
          <label className="block text-sm font-medium text-gray-700 mt-3">First Name</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="fname"
              id="fname"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <label className="block text-sm font-medium text-gray-700 mt-3">Email</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="email"
              id="email"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>}

        {recipientType === "address" &&
          <div>
            <label className="block text-sm font-medium text-gray-700">Polygon Address</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="polygonaddress"
                id="polygonaddress"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>

          </div>}
        {recipientType && <ButtonContainer>
          <SecondaryButton
            text="Back"
            onClick={() => setRecipientType(undefined)}
          />
          <PrimaryButton
            text="Next"
            onClick={() => router.push('/give/category')}
          />
        </ButtonContainer>}

      </div>
    </div>
  )
}

export default GiveTo;

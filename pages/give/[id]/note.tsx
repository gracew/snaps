import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ButtonContainer from '../../../components/buttonContainer';
import Nav from '../../../components/nav';
import PrimaryButton from '../../../components/primaryButton';

const GiveNote: NextPage = () => {
  const router = useRouter();
  const [note, setNote] = useState<string>();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-96 flex flex-col">
        <Nav />
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
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <ButtonContainer>
          <PrimaryButton
            text="Finish"
            onClick={() => router.push('/snaps/1')}
            disabled={!note}
          />
        </ButtonContainer>
      </div>
    </div>
  )
}

export default GiveNote;

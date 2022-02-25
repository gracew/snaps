import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ButtonContainer from '../../../components/buttonContainer'
import Card from '../../../components/card'
import LargeSpinner from '../../../components/largeSpinner'
import Nav from '../../../components/nav'
import PrimaryButton from '../../../components/primaryButton'
import SecondaryButton from '../../../components/secondaryButton'
import { definitions } from "../../../types/supabase"
import { supabase } from '../../api/supabase'

export const spcTypes = [
  {
    id: "spc_nurture",
    label: 'Nurture Yourself',
    description: "The best work is built on a foundation of self-care. Don't be afraid to get your needs met.",
    image: "/spc/nurture.png"
  },
  {
    id: "spc_scale",
    label: 'Scale Your Mountain',
    description: "We explore with intention and ask hard questions of each other, to find work that matters to us.",
    image: "/spc/scale.png"
  },
  {
    id: "spc_dig",
    label: 'Dig Deep Wells',
    description: "By showing up authentically and investing in meaningful relationships, we forge bonds that will last beyond our time at SPC.",
    image: "/spc/dig.png"
  },
  {
    id: "spc_own",
    label: 'Own Your Better Future',
    description: "By immersing yourself and taking initiative, you leave a legacy for those who will walk in your steps. SPC is yours now: you don't need to ask for permission!",
    image: "/spc/own.png"
  },
]

const GiveCategory: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState<string>();
  const [snaps, setSnaps] = useState<definitions["snaps"]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getExistingData() {
      const { data, error } = await supabase
        .from<definitions["snaps"]>("snaps")
        .select("*")
        .eq("id", id as string);
      if (!error && data && data.length > 0) {
        setSnaps(data[0]);
        setCategory(data[0].category);
      }
    };

    getExistingData();
  }, [id]);

  async function onNext() {
    setLoading(true);
    await supabase
      .from<definitions["snaps"]>("snaps")
      .update({ category })
      .eq('id', id as string);
    setLoading(false);
    router.push(`/give/${id}/note`);
  }

  if (!snaps) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
          <LargeSpinner />
      </div>
    );
  }

  if (snaps.note) {
    // the snaps is already complete
    router.push(`/snaps/${id}`);
    return <></>
  }

  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="w-96 flex flex-col">
        <Nav />
        <h1 className="text-2xl font-bold mt-5 mb-3">
          Give Snaps
        </h1>

        <h2 className="my-2">Select a category:</h2>

        {spcTypes.map(t => <Card
          key={t.label}
          selected={category === t.id}
          hover={true}
          onClick={() => setCategory(t.id)}
          imageUrl={t.image}
          label={t.label}
          description={t.description}
        />)}

        <ButtonContainer>
          <SecondaryButton
            text="Back"
            onClick={() => router.push(`/give/${id}`)}
          />
          <PrimaryButton
            text="Next"
            onClick={onNext}
            disabled={!category}
            loading={loading}
          />
        </ButtonContainer>
      </div>
    </div>
  )
}

export default GiveCategory;

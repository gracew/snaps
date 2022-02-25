import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ButtonContainer from '../../../components/buttonContainer'
import Card from '../../../components/card'
import Nav from '../../../components/nav'
import PrimaryButton from '../../../components/primaryButton'
import SecondaryButton from '../../../components/secondaryButton'

const types = [
  {
    label: 'Nurture Yourself',
    description: "The best work is built on a foundation of self-care. Don't be afraid to get your needs met.",
    image: "/spc/nurture.png"
  },
  {
    label: 'Scale Your Mountain',
    description: "We explore with intention and ask hard questions of each other, to find work that matters to us.",
    image: "/spc/scale.png"
  },
  {
    label: 'Dig Deep Wells',
    description: "By showing up authentically and investing in meaningful relationships, we forge bonds that will last beyond our time at SPC.",
    image: "/spc/dig.png"
  },
  {
    label: 'Own Your Better Future',
    description: "By immersing yourself and taking initiative, you leave a legacy for those who will walk in your steps. SPC is yours now: you don't need to ask for permission!",
    image: "/spc/own.png"
  },
]

const GiveCategory: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState<string>();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-96 flex flex-col">
        <Nav />
        <h1 className="text-2xl font-bold mt-5 mb-3">
          Give Snaps
        </h1>

        <h2 className="my-2">Select a category:</h2>

        {types.map(t => <Card
          key={t.label}
          selected={category === t.label}
          onClick={() => setCategory(t.label)}
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
            onClick={() => router.push(`/give/${id}/note`)}
            disabled={!category}
          />
        </ButtonContainer>
      </div>
    </div>
  )
}

export default GiveCategory;

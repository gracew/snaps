import { createReadStream } from 'fs'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Card from '../../components/card'

const types = [
  {
    label: 'Judgement',
    description: "You make wise decisions despite ambiguity. You identify root causes, and get beyond treating symptoms. You think strategically, and can articulate what you are, and are not, trying to do.",
  },
  {
    label: 'Communication',
    description: "You are concise and articulate in speech and writing. You listen well and seek to understand before reacting. You maintain calm poise in stressful situations to draw out the clearest thinking.",
  },
  {
    label: 'Curiosity',
    description: "You learn rapidly and eagerly. You contribute effectively outside of your specialty. You make connections that others miss. You seek to understand our members around the world, and how we entertain them",
  },
  {
    label: 'Courage',
    description: "You say what you think, when it’s in the best interest of Netflix, even if it is uncomfortable. You make tough decisions without agonizing. You take smart risks and are open to possible failure.",
  },
  {
    label: 'Passion',
    description: "You inspire others with your thirst for excellence. You care intensely about our members and Netflix's success. You are tenacious and optimistic. You are quietly confident and openly humble.",
  },
  {
    label: 'Selflessness',
    description: "You seek what is best for Netflix, rather than what is best for yourself or your group. You are open-minded in search of great ideas. You make time to help colleagues."
  },
]

const GiveCategory: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-96 flex flex-col">
        <h1 className="text-2xl font-bold mt-5 mb-3">
          Give Snaps
        </h1>

        <h2 className="my-2">Select a category:</h2>

        {types.map(t => <Card key={t.label} onClick={() => { }} label={t.label} description={t.description} />)}

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-6 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => router.push('/give/note')}
        >Next</button>
      </div>
    </div>
  )
}

export default GiveCategory;

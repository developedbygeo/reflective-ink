import EntryCard from '@/modules/myJournal/EntryCard'
import NewEntryCard from '@/modules/myJournal/NewEntryCard'
import { findUserByClerkId } from '@/utils/auth'
import { getJournalEntries } from '@/utils/prisma-utils'

const getEntries = async () => {
  const user = await findUserByClerkId()
  const entries = getJournalEntries(user.id, 'desc')
  return entries
}

const MyJournalPage = async () => {
  const entries = await getEntries()
  return (
    <div className="max-w-6xl mx-auto mt-20">
      <h2 className="mb-8 text-2xl">My Journal</h2>
      <section className="grid grid-cols-3 gap-12 mt-8">
        <NewEntryCard />
        {entries.map((entry) => (
          <EntryCard entry={entry} key={entry.id} />
        ))}
      </section>
    </div>
  )
}

export default MyJournalPage

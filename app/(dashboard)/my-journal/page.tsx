import Link from 'next/link';

import { findUserByClerkId } from '@/utils/auth';
import { getJournalEntries } from '@/utils/prisma-utils';
import { generateNumberInRange } from '@/utils/misc';

import EntryCard from '@/components/modules/myJournal/EntryCard';
import NewEntryCard from '@/components/modules/myJournal/NewEntryCard';
import Question from '@/components/modules/Question';

const getEntries = async () => {
  const user = await findUserByClerkId();
  const entries = getJournalEntries(user.id, 'desc');
  return entries;
};

const MyJournalPage = async () => {
  const entries = await getEntries();
  return (
    <div className="container mt-20">
      <h2 className="mb-8 text-2xl">My Journal</h2>
      <Question className="w-3/5" />
      <section className="grid grid-cols-3 gap-20 mt-20">
        <div className="w-full col-span-3">
          <NewEntryCard className="w-3/5" />
        </div>
        {entries.map((entry) => {
          const delay = `${generateNumberInRange(100, 1000)}ms`;
          const duration = `${generateNumberInRange(2000, 5000)}ms`;
          return (
            <Link key={entry.id} href={`/my-journal/${entry.id}`}>
              <EntryCard
                animation={{ delay, duration }}
                entry={entry}
                key={entry.id}
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default MyJournalPage;

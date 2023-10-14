import Editor from '@/components/modules/myJournal/Editor';
import { getJournalEntry } from '@/utils/prisma-utils';

type EntryPageParams = {
  params: { id: string };
};

const EntryPage = async ({ params }: EntryPageParams) => {
  const { id } = params;
  const entry = await getJournalEntry(id);
  const analysisData = [
    { name: 'Summary', value: 'Current summary' },
    { name: 'Subject', value: 'Current subject' },
    { name: 'Mood', value: 'Custom mood' },
    { name: 'Negative', value: false },
  ];

  return (
    <div className="w-full grid grid-cols-12 mt-32 gap-4 h-full">
      <section className="col-span-6 col-start-2">
        <h1 className="">Entry {id}</h1>
        <Editor entry={entry} />
      </section>
      <section className="border-l col-start-10 col-span-3 border-black/10">
        <div className="bg-blue-300 h-full px-6 py-1">
          <h2 className="text-2xl">Analysis</h2>
        </div>
      </section>
    </div>
  );
};

export default EntryPage;

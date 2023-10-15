import SentimentFigure from '@/components/UI/SentimentFigure';
import Analysis from '@/components/modules/myJournal/Analysis';
import Editor from '@/components/modules/myJournal/Editor';
import { getJournalEntry } from '@/utils/prisma-utils';

type EntryPageParams = {
  params: { id: string };
};

const EntryPage = async ({ params }: EntryPageParams) => {
  const { id } = params;
  const entry = await getJournalEntry(id);

  return (
    <div className="w-full mt-32 h-full">
      <section className="">
        <h1 className="col-start-2 col-span-8">Entry {id}</h1>
        <Editor className="" entry={entry} />
      </section>
    </div>
  );
};

export default EntryPage;

import Editor from '@/components/modules/myJournal/Editor';
import { getJournalEntry } from '@/utils/prisma-utils';

type EntryPageParams = {
  params: { id: string };
};

const EntryPage = async ({ params }: EntryPageParams) => {
  const { id } = params;
  const entry = await getJournalEntry(id);
  return (
    <div className="w-full h-full">
      <h1>Entry {id}</h1>
      <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;

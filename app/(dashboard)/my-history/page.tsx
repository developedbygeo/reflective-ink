import MoodChart from '@/components/modules/myHistory/MoodChart';
import { getHistoryData } from '@/utils/prisma-utils';

const History = async () => {
  const { analysisAvg, analysisTotal } = await getHistoryData();
  return (
    <section className="w-full h-full container mt-20">
      <article>
        <h1 className="text-xl text-gray-200">
          Here is an line chart of your mood on a daily basis, based on your
          entries.
        </h1>
        <div className="w-full lg:w-3/5 mt-4 text-base text-gray-300">
          <p>
            The Average Sentiment (AS) is calculated by taking the average of
            all the sentiment scores of your entries. Each entry is given a
            score between -10 and 10, with -10 being the most negative and 10
            being the most positive.
          </p>
          <p className="mt-2">Your AS is: {analysisAvg}</p>
        </div>
      </article>
      <div className="w-full mt-12 lg:mt-0 h-[50vh]">
        <MoodChart data={analysisTotal} />
      </div>
    </section>
  );
};

export default History;

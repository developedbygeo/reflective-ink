'use client';

import SentimentFigure from '@/components/UI/SentimentFigure';
import { CommonProps } from '@/types/UI';
import { EntryAnalysisData } from '@/types/data';

type AnalysisProps = CommonProps & {
  analysis: EntryAnalysisData[];
  sentimentColor: string | undefined;
};

const Analysis = ({ className, analysis, sentimentColor }: AnalysisProps) => {
  return (
    <section className={className}>
      <div className="bg-darkGray shadow-neumorphicTopLeft h-full px-6 py-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">Analysis</h2>
          <SentimentFigure sentimentColor={sentimentColor} />
        </div>
        <ul>
          {analysis.map((data) => (
            <li
              key={data.name}
              className="flex px-2 py-4 border-b border-b-gray-300/10 justify-between"
            >
              <span className="text-md font-semibold">{data.name}</span>
              <span>{data.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Analysis;

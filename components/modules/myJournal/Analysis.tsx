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
          {analysis.map((data) => {
            const parsedValue =
              typeof data.value === 'boolean'
                ? data.value.toString()
                : data.value;
            return (
              <li
                key={data.name}
                className="flex px-2 py-6 first:mt-4 lg:first:mt-0 lg:py-4 border-b border-b-gray-300/10 justify-between"
              >
                <span className="text-gray-400 font-semibold">{data.name}</span>
                <span className="capitalize text-textLight">{parsedValue}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Analysis;

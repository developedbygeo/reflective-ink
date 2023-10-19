'use client';

import { HistoryAnalysis } from '@/types/data';
import { parseDateForTable } from '@/utils/misc';
import {
  ResponsiveContainer,
  Line,
  XAxis,
  Tooltip,
  LineChart,
  TooltipProps,
} from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

type MoodChartProps = {
  data: HistoryAnalysis[];
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  const dateXLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (active && payload) {
    const analysis = payload[0].payload as HistoryAnalysis;
    return (
      <div className="p-8 custom-tooltip bg-darkGray shadow-neumorphicTopLeft border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-0 top-2 w-full h-2 rounded-full"
          style={{ background: analysis?.color }}
        ></div>
        <p className="label text-sm text-gray-200">{dateXLabel}</p>
        <p className="intro text-xl uppercase">{analysis?.mood}</p>
      </div>
    );
  }

  return null;
};

const MoodChart = ({ data }: MoodChartProps) => {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 6 }}
          activeDot={{ r: 10 }}
        />
        <XAxis
          dy={10}
          tick={{ stroke: '#E5E7EB' }}
          dataKey="updatedAt"
          tickFormatter={parseDateForTable}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MoodChart;

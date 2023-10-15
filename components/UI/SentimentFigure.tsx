import { CommonProps } from '@/types/UI';

type SentimentFigureProps = CommonProps & {
  sentimentColor?: string;
};

const SentimentFigure = ({
  className,
  sentimentColor,
}: SentimentFigureProps) => {
  if (!sentimentColor) return null;

  return (
    <figure className={className}>
      <div
        title="Color corresponding the sentiment of the entry"
        className="w-6 h-6 rounded-full"
        style={{ background: sentimentColor }}
      ></div>
      <figcaption className="sr-only">
        Color corresponding the sentiment of the ent
      </figcaption>
    </figure>
  );
};

export default SentimentFigure;

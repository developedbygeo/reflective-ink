import { Entry } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/UI/Card';
import { CommonProps } from '@/types/UI';
import classnameJoin from '@/utils/ui';
import { EntryAnalysis } from '@/types/data';

type EntryCardAnimation = {
  delay: string;
  duration: string;
};

type EntryCardProps = CommonProps & {
  entry: Entry & {
    analysis: EntryAnalysis | null;
  };

  animation: EntryCardAnimation;
};

const EntryCard = ({ className, animation, entry }: EntryCardProps) => {
  if (!entry || !entry.analysis) return null;
  const parsedCreatedAt = new Date(entry.createdAt).toDateString();
  return (
    <div className={classnameJoin('relative', className)}>
      <div
        className="absolute inset-0 -bottom-2 animate-pulse delay-300 h-full w-full bg-gradient-to-r from-red-100 to-purple-900 transform scale-[0.8] rounded-full blur-[2.25rem] z-0"
        style={{
          animationDelay: animation.delay,
          animationDuration: animation.duration,
        }}
      />
      <Card className="relative z-20 bg-darkGray shadow-neumorphicTopLeft">
        <CardContent className="px-5 py-4 space-y-4 text-textLight">
          <CardDescription className="mt-3 text-textLight">
            {entry.content}
          </CardDescription>
          <CardDescription className="text-gray-400 flex gap-2">
            Summary:
            <span className="text-textLight capitalize">
              {entry.analysis.summary}
            </span>
          </CardDescription>
          <CardDescription className="text-gray-400 flex gap-2">
            Mood:{' '}
            <span className="text-textLight capitalize">
              {entry.analysis.mood}
            </span>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <p className="text-gray-400 flex gap-2">
            Created at:
            <span className="text-textLight capitalize">{parsedCreatedAt}</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EntryCard;

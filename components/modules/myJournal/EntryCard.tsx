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

type EntryCardAnimation = {
  delay: string;
  duration: string;
};

type EntryCardProps = CommonProps & {
  entry: Entry;
  animation: EntryCardAnimation;
};

const EntryCard = ({ className, animation, entry }: EntryCardProps) => {
  const parsedCreatedAt = new Date(entry.createdAt).toDateString();
  return (
    <div className={classnameJoin('relative', className)}>
      <div
        className="absolute inset-0 -bottom-2 animate-pulse delay-300 h-full w-full bg-gradient-to-r from-red-100 to-blue-500 transform scale-[0.8] bg-red-500 rounded-full blur-[2.25rem] z-0"
        style={{
          animationDelay: animation.delay,
          animationDuration: animation.duration,
        }}
      />
      <Card className="shadow-neumorphicTopLeft relative z-20">
        <CardContent className="px-5 py-4 space-y-4 text-textLight">
          <CardDescription className="mt-3 text-textLight">
            {entry.content}
          </CardDescription>
          <CardDescription className="text-textLight">summary</CardDescription>
          <CardDescription className="text-textLight">mood</CardDescription>
        </CardContent>
        <CardFooter>
          <p>
            Created at:
            <span>{parsedCreatedAt}</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EntryCard;

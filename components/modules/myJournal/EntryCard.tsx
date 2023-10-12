import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/UI/Card';
import { Entry } from '@prisma/client';

type EntryCardProps = {
  entry: Entry;
};

const EntryCard = ({ entry }: EntryCardProps) => {
  const parsedDate = new Date(entry.createdAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="relative">
      <div className="absolute inset-0 -bottom-2 h-full w-full bg-gradient-to-r from-red-300 to-blue-500 transform scale-[0.50] bg-red-500 rounded-full blur-2xl z-0" />
      <Card className="shadow-neumorphicTopLeft relative z-20">
        <CardDescription>Entry</CardDescription>
        <CardFooter>
          <p>
            Created at:
            <span>22/02/2023</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EntryCard;

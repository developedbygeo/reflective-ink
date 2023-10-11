import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/UI/Card'
import { Entry } from '@prisma/client'

type EntryCardProps = {
  entry: Entry
}

const EntryCard = ({ entry }: EntryCardProps) => {
  const parsedDate = new Date(entry.createdAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return (
    <Card>
      <CardDescription>Entry</CardDescription>
      <CardFooter>
        <p>
          Created at:
          <span>22/02/2023</span>
        </p>
      </CardFooter>
    </Card>

    // <Card>
    //   <CardDescription>{entry.content}</CardDescription>
    //   <CardFooter>
    //     <p>
    //       Created at:
    //       <span>{parsedDate}</span>
    //     </p>
    //   </CardFooter>
    // </Card>
  )
}

export default EntryCard

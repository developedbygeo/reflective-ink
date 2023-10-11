import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { prisma as prismaInstance } from '@/utils/db';
import Spinner from '@/components/UI/Spinner';

const createNewUser = async () => {
  console.log('CREATING NEW USER');
  const user = await currentUser();
  const match = await prismaInstance.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });

  if (!match) {
    await prismaInstance.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    });
  }
  redirect('/my-journal');
};

const NewUser = async () => {
  await createNewUser();

  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <Spinner className="h-12 w-12" />
    </section>
  );
};

export default NewUser;

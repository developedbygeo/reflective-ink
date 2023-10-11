import { auth } from '@clerk/nextjs';
import { prisma } from './db';
import { User } from '@prisma/client';

type Select<T> = {
  [P in keyof T]?: boolean;
};

export const findUserByClerkId = async ({
  select,
}: { select?: Select<User> } = {}): Promise<User> => {
  const { userId } = auth();
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
    select,
  });

  return user;
};

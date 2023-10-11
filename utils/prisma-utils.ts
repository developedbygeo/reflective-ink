import { prisma } from '@/utils/db';

export const getJournalEntries = async (
  userId: string,
  createdAt: 'desc' | 'asc',
) => {
  const entries = await prisma.entry.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt,
    },
  });

  return entries;
};

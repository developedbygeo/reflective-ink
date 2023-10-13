import { prisma } from '@/utils/db';
import { findUserByClerkId } from '@/utils/auth';

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
    include: {
      analysis: true,
    },
  });

  return entries;
};

export const getJournalEntry = async (id: string) => {
  const user = await findUserByClerkId();
  const entry = await prisma.entry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

export const updateJournalEntry = async (id: string, content: string) => {
  const user = await findUserByClerkId();
  const updatedEntry = await prisma.entry.update({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    data: {
      content,
    },
  });

  return updatedEntry;
};

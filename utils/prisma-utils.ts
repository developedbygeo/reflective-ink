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

export const getHistoryData = async () => {
  const user = await findUserByClerkId();
  const analysisTotal = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  const analysisSum = analysisTotal.reduce((a, b) => a + b.sentimentScore, 0);
  const analysisAvg = Math.round(analysisSum / analysisTotal.length);
  return { analysisTotal, analysisAvg };
};

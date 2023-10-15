import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/db';
import { analyze } from '@/utils/ai';
import { updateJournalEntry } from '@/utils/prisma-utils';

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const data = await request.json();

  const updatedEntry = await updateJournalEntry(params.id, data.content);
  const analysis = await analyze(updatedEntry.content);

  if (analysis) {
    await prisma.analysis.upsert({
      where: { entryId: updatedEntry.id },
      create: {
        entryId: updatedEntry.id,
        ...analysis,
      },
      update: analysis,
    });
  }

  return NextResponse.json({ data: updatedEntry });
};

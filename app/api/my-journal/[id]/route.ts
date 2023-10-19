import { NextRequest, NextResponse } from 'next/server';

import { updateJournalEntry } from '@/utils/prisma-utils';
import { update } from '@/utils/actions';
import { prisma } from '@/utils/db';
import { analyze } from '@/utils/ai';

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const data = await request.json();

  const updatedEntry = await updateJournalEntry(params.id, data.content);
  const analysis = await analyze(updatedEntry.content);
  let updatedAnalysis;

  if (analysis) {
    updatedAnalysis = await prisma.analysis.upsert({
      where: { entryId: updatedEntry.id },
      create: {
        userId: updatedEntry.userId,
        entryId: updatedEntry.id,
        ...analysis,
      },
      update: analysis,
    });
  }

  update(['/my-journal']);

  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  });
};

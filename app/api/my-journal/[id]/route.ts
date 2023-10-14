import { findUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { updateJournalEntry } from '@/utils/prisma-utils';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const data = await request.json();

  const updatedEntry = await updateJournalEntry(params.id, data.content);

  return NextResponse.json({ data: updatedEntry });
};

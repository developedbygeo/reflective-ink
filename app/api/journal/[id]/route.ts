import { findUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { updateJournalEntry } from '@/utils/prisma-utils';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const content = await request.json();
  const updatedEntry = await updateJournalEntry(params.id, content);

  return NextResponse.json({ data: updatedEntry });
};

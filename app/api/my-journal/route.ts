import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { update } from '@/utils/actions';
import { findUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { analyze } from '@/utils/ai';

export const POST = async (request: Request) => {
  const { content } = await request.json();
  const user = await findUserByClerkId();
  const entry = await prisma.entry.create({
    data: {
      userId: user.id,
      content,
    },
  });

  const analysis = await analyze(entry.content);
  if (analysis) {
    await prisma.analysis.create({
      data: {
        userId: user.id,
        entryId: entry.id,
        ...analysis,
      },
    });
  }

  update(['/my-journal']);

  return NextResponse.json({ data: entry });
};

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

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
        entryId: entry.id,
        ...analysis,
      },
    });
  }

  revalidatePath('/my-journal'); // once we hit this route, revalidate the /my-journal page to show the new entry. It basically
  // tells Next.js to clear the cache & re-render the page the next time it is requested.

  return NextResponse.json({ data: entry });
};

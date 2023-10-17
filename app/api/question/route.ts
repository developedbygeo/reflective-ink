import { qaModel } from '@/utils/ai';
import { findUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const { question } = await request.json();
  const user = await findUserByClerkId();

  const entries = await prisma.entry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  const answer = await qaModel(question, entries);

  return NextResponse.json({ data: answer });
};

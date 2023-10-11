import { NextResponse } from 'next/server'

import { findUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

export const POST = async () => {
  const user = await findUserByClerkId()
  const entry = await prisma.entry.create({
    data: {
      userId: user.id,
      content: 'Hello world',
    },
  })

  return NextResponse.json({ data: entry })
}

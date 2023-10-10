import { PrismaClient } from '@prisma/client';

// creating a new instance of the client. If already instantiated (by leveraging node's globalThis), we use the existing one.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

// due to HMR, the connection will break.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

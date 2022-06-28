import { PrismaClient } from '@prisma/client';
import { getEnv } from './env';

interface CustomNodeJsGlobal {
  prisma: PrismaClient | undefined;
}

declare const global: CustomNodeJsGlobal;

const prismaClient = global.prisma || new PrismaClient();

if (getEnv('NODE_ENV') === 'development') global.prisma = prismaClient;

export default prismaClient;

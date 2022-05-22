import { PrismaClient } from '@prisma/client';
import { getEnv } from './env';

interface CustomNodeJsGlobal {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (getEnv('NODE_ENV') === 'development') global.prisma = prisma;

export default prisma;

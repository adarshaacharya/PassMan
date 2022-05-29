import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { getEnv } from '@/libs/server/env';
import prisma from '@/libs/server/prisma';

const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: getEnv('GITHUB_ID'),
      clientSecret: getEnv('GITHUB_SECRET'),
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: getEnv('GITHUB_SECRET'),
  theme: {
    colorScheme: 'light',
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

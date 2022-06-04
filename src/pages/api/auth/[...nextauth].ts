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
      httpOptions: {
        timeout: 40000,
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: getEnv('GITHUB_SECRET'),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  theme: {
    colorScheme: 'light',
  },
  debug: getEnv('NODE_ENV') === 'development',
  callbacks: {
    // https://github.com/nextauthjs/next-auth/discussions/536#discussioncomment-154389
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

import prisma from '@/libs/server/prisma';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Vault } from '@/enums';
import { ResponseType } from '@/types';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === 'GET') {
    try {
      const vault = await prisma.vault.findFirst({
        where: {
          category: Vault.PERSONAL,
        },
      });

      return res.status(200).json({
        isVaultCreated: !!vault,
        category: vault?.category,
        ok: true,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message, ok: false });
    }
  }

  if (req.method === 'POST') {
    try {
      const session = await getSession({ req });
      const userId = session?.user?.id;
      const {
        body: { category = Vault.PERSONAL, key },
      } = req;
      const vaultExists = await prisma.vault.findFirst({
        where: {
          category,
          owner: { id: userId },
        },
      });

      if (vaultExists) {
        return res.status(400).json({
          error: `${category} Vault already exists`,
          ok: false,
        });
      }

      const vault = await prisma.vault.create({
        data: {
          category,
          key,
          owner: {
            connect: {
              id: userId,
            },
          },
        },
      });
      res.status(200).json({ vault, ok: true });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message, ok: false });
    }
  }
}

export default withHandler({
  methods: ['GET', 'POST'],
  handler,
  isPrivateRoute: true,
});

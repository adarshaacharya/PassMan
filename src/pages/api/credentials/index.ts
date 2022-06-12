import { Vault } from '@/enums';
import Aes256 from '@/libs/server/Aes256';
import prisma from '@/libs/server/prisma';
import withHandler from '@/libs/server/withHandler';
import { ResponseType } from '@/types';
import { VaultCategory } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === 'GET') {
    try {
      const { category } = req.query;
      const session = await getSession();
      const userId = session?.user?.id;

      const vault = await prisma.vault.findFirst({
        where: {
          category: category as VaultCategory,
          owner: { id: userId },
        },
      });

      if (!vault) {
        return res.status(404).json({
          ok: false,
          errorMessage: 'Vault not found',
        });
      }

      const credentials = await prisma.credential.findMany({
        where: {
          category: VaultCategory.PERSONAL,
          vault: { id: vault?.id },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      res.status(200).json({ credentials, ok: true });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message, ok: false });
    }
  }

  if (req.method === 'POST') {
    try {
      const session = await getSession({ req });
      const userId = session?.user?.id;
      const {
        body: { email, username, website, description, password, category },
      } = req;

      const vault = await prisma.vault.findFirst({
        where: {
          category,
          owner: { id: userId },
        },
      });

      if (!vault) {
        return res.status(404).json({
          errorMessage: `${Vault.PERSONAL} Vault doesn't exists`,
          ok: false,
        });
      }

      const { encryptedPassword, initializationVector } =
        Aes256.getInstance().encryptSync(password, vault.key);
      const credential = await prisma.credential.create({
        data: {
          email,
          username,
          website,
          description,
          password: encryptedPassword,
          initializationVector,
          category,
          vault: {
            connect: {
              id: vault.id,
            },
          },
        },
      });
      res.status(200).json({ credential, ok: true });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message, ok: false });
    }
  }
}

export default withHandler({
  methods: ['GET', 'POST'],
  handler,
  isPrivateRoute: true,
});

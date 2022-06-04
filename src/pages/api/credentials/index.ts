import { Vault } from '@/enums';
import Aes256 from '@/libs/server/Aes256';
import prisma from '@/libs/server/prisma';
import withHandler from '@/libs/server/withHandler';
import { ResponseType } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === 'GET') {
    try {
      const session = await getSession({ req });
      const userId = session?.user?.id;
      const credentials = await prisma.credential.findMany({
        where: {
          owner: {
            id: userId,
          },
        },
      });
      res.status(200).json({ credentials, ok: true });
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
        body: { email, username, website, description, password },
      } = req;

      //@TODO : find vault from userId & vaultId not from category
      const vault = await prisma.vault.findFirst({
        where: {
          category: Vault.PERSONAL,
          owner: { id: userId },
        },
      });

      if (!vault) {
        return res.status(400).json({
          error: `${Vault.PERSONAL} Vault doesn't exists`,
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
          vault: {
            connect: {
              id: userId,
            },
          },
          owner: {
            connect: {
              id: userId,
            },
          },
        },
      });
      res.status(200).json({ credential, ok: true });
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

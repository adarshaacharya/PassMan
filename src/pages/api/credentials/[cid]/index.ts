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
  //@note: currently we are getting credential from getServerSideProps() on page level
  if (req.method === 'GET') {
    const session = await getSession({ req });
    const userId = session?.user?.id;

    try {
      const {
        query: { cid },
      } = req;

      const vault = await prisma.vault.findFirst({
        where: {
          category: VaultCategory.PERSONAL,
          owner: { id: userId },
        },
      });

      let credential = await prisma.credential.findFirst({
        where: {
          id: cid?.toString(),
          vault: { id: vault?.id },
        },
        include: {
          vault: {
            select: {
              key: true,
            },
          },
        },
      });

      if (!credential) {
        return res.status(404).json({
          errorMessage: 'Credential not found',
          ok: false,
        });
      }

      const decryptedPassword = Aes256.getInstance().decryptSync({
        hashedVaultKey: credential.vault.key,
        initializationVector: credential.initializationVector,
        encryptedPassword: credential.password,
      });
      credential = {
        ...credential,
        password: decryptedPassword,
      };

      res.status(200).json({ credential, ok: true });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message, ok: false });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const {
        query: { cid },
      } = req;

      const credential = await prisma.credential.delete({
        where: {
          id: cid.toString(),
        },
      });

      if (!credential) {
        return res.status(404).json({
          errorMessage: 'Credential not found',
          ok: false,
        });
      }

      res.status(200).json({ credential, ok: true });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message, ok: false });
    }
  }
}

export default withHandler({
  methods: ['GET', 'DELETE'],
  handler,
  isPrivateRoute: true,
});

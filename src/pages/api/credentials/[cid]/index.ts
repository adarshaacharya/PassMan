import Aes256 from '@/libs/server/Aes256';
import prisma from '@/libs/server/prisma';
import withHandler from '@/libs/server/withHandler';
import { ResponseType } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === 'GET') {
    try {
      const {
        query: { cid },
      } = req;

      let credential = await prisma.credential.findUnique({
        where: {
          id: cid.toString(),
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
        return res.status(400).json({
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

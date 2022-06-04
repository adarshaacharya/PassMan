import Crypto from '@/libs/server/crypto';
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
        query: { id },
      } = req;

      let credential = await prisma.credential.findUnique({
        where: {
          id: id.toString(),
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
          error: 'Credential not found',
          ok: false,
        });
      }

      credential = {
        ...credential,
        password: Crypto.getInstance().decrypt(
          credential.password,
          credential.initializationVector,
          credential.vault.key,
        ),
      };

      res.status(200).json({ credential, ok: true });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message, ok: false });
    }
  }
}

export default withHandler({
  methods: ['GET'],
  handler,
  isPrivateRoute: true,
});

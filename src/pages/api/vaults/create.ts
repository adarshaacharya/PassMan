import Crypto from '@/libs/server/ScryptHasher';
import prisma from '@/libs/server/prisma';
import withHandler from '@/libs/server/withHandler';
import { ResponseType } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === 'POST') {
    try {
      const session = await getSession({ req });
      const userId = session?.user?.id;
      const {
        body: { category, key },
      } = req;
      const vaultExists = await prisma.vault.findFirst({
        where: {
          category,
          owner: { id: userId },
        },
      });

      if (vaultExists) {
        return res.status(400).json({
          errorMessage: `${category} Vault already exists`,
          ok: false,
        });
      }

      const hashedVaultKey = Crypto.getInstance().hashSync(key);

      const vault = await prisma.vault.create({
        data: {
          category,
          key: hashedVaultKey,
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
      res.status(400).json({ errorMessage: error.message, ok: false });
    }
  }
}

export default withHandler({
  methods: ['POST'],
  handler,
  isPrivateRoute: true,
});

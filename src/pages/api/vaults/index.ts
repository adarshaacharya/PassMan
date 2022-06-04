import { Vault } from '@/enums';
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
}

export default withHandler({
  methods: ['GET', 'POST'],
  handler,
  isPrivateRoute: true,
});

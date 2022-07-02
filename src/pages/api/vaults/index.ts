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
      const { category } = req.body;
      const session = await getSession({ req });
      const userId = session?.user?.id;

      const vault = await prisma.vault.findFirst({
        where: {
          category,
          owner: { id: userId },
        },
      });

      return res.status(200).json({
        isVaultCreated: !!vault,
        category,
        ok: true,
      });
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

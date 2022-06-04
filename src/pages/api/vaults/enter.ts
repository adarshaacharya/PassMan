import prisma from '@/libs/server/prisma';
import withHandler from '@/libs/server/withHandler';
import { ResponseType } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import * as bcrypt from 'bcryptjs';

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
      const vault = await prisma.vault.findFirst({
        where: {
          category,
          owner: { id: userId },
        },
      });

      if (!vault) {
        return res.status(400).json({
          error: `${category} Vault doesn't exists`,
          ok: false,
        });
      }

      const isValid = bcrypt.compareSync(key, vault.key);

      if (!isValid) {
        return res.status(400).json({
          error: 'Vault key is incorrect',
          ok: false,
        });
      }

      res.status(200).json({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message, ok: false });
    }
  }
}

export default withHandler({
  methods: ['POST'],
  handler,
  isPrivateRoute: true,
});

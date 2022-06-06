import prisma from '@/libs/server/prisma';
import ScryptHasher from '@/libs/server/ScryptHasher';
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

      const isValid = ScryptHasher.getInstance().compareSync(key, vault.key);
      if (!isValid) {
        return res.status(400).json({
          error: 'You entered an invalid vault key. Please try again.',
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

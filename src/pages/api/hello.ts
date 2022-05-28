// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

type Data = {
  name: string;
};

const hello = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getSession({ req });
  if (session) {
    res.status(200).json({ name: session.user?.name || '' });
  } else {
    res.status(401);
  }
  res.end();
};

export default hello;

/**
 * server creation reference
 *
 */

/**
 * LINKS
 *
 * https://github.com/daniellaera/prisma-nextjs-auth-blog/blob/main/pages/api/post/%5Bid%5D.ts
 *
 *
 *
 */

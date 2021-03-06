import { HTTPMethod } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

interface ConfigType {
  methods: HTTPMethod[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivateRoute?: boolean;
}

export default function withHandler({
  methods,
  isPrivateRoute = true,
  handler,
}: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !methods.includes(req.method as HTTPMethod)) {
      return res
        .status(405)
        .json({ ok: false, error: `${req.method} Method not allowed` });
    }

    const session = await getSession({ req });
    if (isPrivateRoute && !session) {
      return res
        .status(401)
        .json({ ok: false, error: 'Unauthorized, Please log in.' });
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

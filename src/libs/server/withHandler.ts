import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

interface ConfigType {
  methods: Method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivateRoute?: boolean;
}

export default function withHandler({
  methods,
  isPrivateRoute = true,
  handler,
}: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !methods.includes(req.method as Method)) {
      return res.status(405).end();
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

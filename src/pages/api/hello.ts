import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  res.json({ ok: true });
}

export default withHandler({
  methods: ['GET'],
  handler,
  isPrivateRoute: true,
});

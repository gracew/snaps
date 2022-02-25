import type { NextApiRequest, NextApiResponse } from 'next';
import { runMiddleware, validateJwtIfExists } from './middleware';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, validateJwtIfExists);
  res.status(200).json({ address: req.body.address, email: req.body.email });
}
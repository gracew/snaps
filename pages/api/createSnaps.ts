import type { NextApiRequest, NextApiResponse } from 'next';
import { runMiddleware, validateJwt } from './middleware';
import { supabase } from './supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  await runMiddleware(req, res, validateJwt);

  const { data } = await supabase
    .from("snaps")
    .insert([{
      sender_id: req.body.sub,
      recipient_type: req.body.recipientType,
      recipient: req.body.recipient,
    }]);

  if (!data || data.length === 0) {
    res.status(500).end();
    return;
  }

  res.status(200).json(data[0]);
  return;
}

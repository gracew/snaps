import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthType } from '../../auth';
import { definitions } from "../../types/supabase";
import { runMiddleware, validateJwt } from './middleware';
import { supabase } from './supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  await runMiddleware(req, res, validateJwt);

  const recipientInfo: Partial<definitions["snaps"]> = req.body.recipientType === AuthType.EMAIL
    ? { recipient_fname: req.body.recipientName, recipient_email: req.body.recipientEmail }
    : { recipient_wallet_address: req.body.recipientAddress };
  const { data, error } = await supabase
    .from<definitions["snaps"]>("snaps")
    .insert([{
      sender_id: req.body.jwt.sub,
      recipient_type: req.body,
      ...recipientInfo,
    }]);

  if (error) {
    console.log(error);
    res.status(500).end();
    return;
  }
  if (!data || data.length === 0) {
    res.status(500).end();
    return;
  }

  res.status(200).json(data[0]);
  return;
}

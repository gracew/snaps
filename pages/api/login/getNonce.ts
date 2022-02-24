import type { NextApiRequest, NextApiResponse } from 'next';
import { runMiddleware, validateJwtIfExists } from '../middleware';
import { supabase } from '../supabase';


type Data = {
  nonce: string
  validToken: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const address = req.body.address?.toLowerCase();
  
  await runMiddleware(req, res, validateJwtIfExists);
  const validToken = Boolean(req.body.validToken)

  const { data } = await supabase
    .from("nonces")
    .select("*")
    .eq("wallet_address", address);

  if (data && data.length > 0) {
    res.status(200).json({ nonce: data[0].nonce, validToken });
    return;
  }

  const { data: newData } = await supabase
    .from("nonces")
    .insert([{ wallet_address: address }]);
  if (newData && newData.length > 0) {
    
    res.status(200).json({ nonce: newData[0].nonce, validToken });
    return;
  };

  res.status(500).end();
}

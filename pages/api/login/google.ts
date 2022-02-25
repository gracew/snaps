import { serialize } from 'cookie';
import { OAuth2Client } from 'google-auth-library';
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../supabase';

type Data = {
  nonce: string
  validToken: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await googleClient.verifyIdToken({
    idToken: req.body.tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error("provided idToken was invalid");
  }
  console.log(payload);

  // successful login; insert into users table
  const { data: newUsers } = await supabase
    .from("users")
    .insert([{ email: payload.email }]);

  if (!newUsers || newUsers.length === 0) {
    res.status(500).end();
    return;
  }

  const id = newUsers[0].id;
  const token = jwt.sign({ sub: id, type: "email", email: payload.email }, process.env.JWT_SECRET!);
  res.status(200).setHeader('Set-Cookie', serialize('snToken', token, { path: "/" }));
  res.end();
}

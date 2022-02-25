import { serialize } from 'cookie';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from 'next';
import { definitions } from '../../../types/supabase';
import { supabase } from '../supabase';

type Data = {
  nonce: string
  validToken: boolean
}

async function insertIntoUsers(payload: TokenPayload) {
  const existingRes = await supabase
    .from<definitions["users"]>("users")
    .select("*")
    .eq("email", payload.email);
  if (existingRes.error) {
    return undefined;
  }

  if (existingRes.data && existingRes.data.length > 0) {
    return existingRes.data[0].id;
  }

  const newRes = await supabase
    .from<definitions["users"]>("users")
    .insert([{ email: payload.email, fname: payload.given_name }]);
  if (newRes.error || !newRes.data || newRes.data.length === 0) {
    return undefined;
  }
  return newRes.data[0].id;
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
  const id = await insertIntoUsers(payload);
  if (!id) {
    res.status(500).end();
    return;
  }

  const token = jwt.sign({ sub: id, type: "email", email: payload.email, fname: payload.given_name }, process.env.JWT_SECRET!);
  res.status(200).setHeader('Set-Cookie', serialize('snToken', token, { path: "/" }));
  res.end();
}

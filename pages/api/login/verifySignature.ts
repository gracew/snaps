import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { serialize } from 'cookie';
import { randomUUID } from 'crypto';
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from 'next';
import { signatureInput } from '../../../auth';
import { supabase } from '../supabase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    const address = req.body.address?.toLowerCase();
    const { data } = await supabase
        .from("nonces")
        .select("*")
        .eq("wallet_address", address);
    if (!data || data.length === 0) {
        res.status(400).end("no nonce found");
        return;
    }
    const recoveredAddress = recoverPersonalSignature({
        data: signatureInput(data[0].nonce),
        signature: req.body.signature,
    })
    if (recoveredAddress !== address) {
        res.status(400).end("invalid signature");
        return;
    }

    // successful login; replace nonce and insert into users table
    await supabase
        .from("nonces")
        .update({ nonce: randomUUID() })
        .eq('wallet_address', address);
    await supabase
        .from("users")
        .insert([{ wallet_address: address }]);

    const token = jwt.sign({ sub: recoveredAddress, type: "address" }, process.env.JWT_SECRET!);
    res.status(200).setHeader('Set-Cookie', serialize('snToken', token, { path: "/" }));
    res.end();
}

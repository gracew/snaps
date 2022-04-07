import formidable from "formidable";
import fs from "fs";
import { create as ipfsHttpClient } from "ipfs-http-client";
import type { NextApiRequest, NextApiResponse } from 'next';
import { definitions } from "../../types/supabase";
import { iwdTypes, spcTypes } from "../give/[id]/category";
import { supabase } from './supabase';

// @ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export async function resolveCategory(snapsCategory: string) {
  const category = (spcTypes.concat(iwdTypes)).find(c => c.id === snapsCategory);
  if (category) {
    return category;
  }
  const categoryRes = await supabase
    .from("categories")
    .select("*")
    .eq('id', snapsCategory);
  if (!categoryRes.data || categoryRes.data.length === 0) {
    console.log("could not resolve category");
    return;
  }
  return categoryRes.data[0];
}

// don't process the body - formidable will handle that
export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
      res.end(String(err));
      return;
    }
    const { recipientName, recipientEmail, note, label, mediaType } = fields;

    const metadataResult = await client.add(fs.createReadStream((files["media"] as any).filepath));
    const url = `https://ipfs.infura.io/ipfs/${metadataResult.path}`;

    console.log(url);

    const insertCategoryRes = await supabase
      .from("categories")
      .insert([{
        label,
        media: url,
        media_type: mediaType,
      }]);

    if (insertCategoryRes.error || !insertCategoryRes.data || insertCategoryRes.data.length === 0) {
      res.status(500).end();
      return;
    }
    const categoryId = insertCategoryRes.data[0].id;

    const insertSnapsRes = await supabase
      .from<definitions["snaps"]>("snaps")
      .insert([{
        sender_id: "36f30956-96db-40b5-a040-9ace042b44be",
        //sender_id: "8581e3bd-9a1f-4ef1-a384-1306df1f89af",
        recipient_type: "email",
        recipient_fname: recipientName as string,
        note: note as string,
        category: categoryId,
      }]);
    if (insertSnapsRes.error || !insertSnapsRes.data || insertSnapsRes.data.length === 0) {
      res.status(500).end();
      return;
    }

    const snaps = insertSnapsRes.data[0];
    // save recipient email to separate, non-public table
    const insertEmailRes = await supabase
      .from<definitions["recipient_emails"]>("recipient_emails")
      .insert([{
        snaps_id: snaps.id,
        recipient_email: recipientEmail as string,
      }]);
    if (insertEmailRes.error || !insertEmailRes.data || insertEmailRes.data.length === 0) {
      res.status(500).end();
      return;
    }

    res.status(200).json(snaps);
    return;
  });

}

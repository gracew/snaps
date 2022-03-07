import sendgrid from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthType } from '../../auth';
import { definitions } from "../../types/supabase";
import { runMiddleware, validateJwt } from './middleware';
import { supabase } from './supabase';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, validateJwt);
  const { id, note } = req.body;
  const { data, error } = await supabase
    .from<definitions["snaps"]>("snaps")
    .update({ note })
    .eq('id', id);
  if (error || !data || data.length === 0) {
    res.status(500).end();
    return;
  }
  const snaps = data[0];

  if (snaps.recipient_type === AuthType.EMAIL) {
    const emailRes = await supabase
      .from<definitions["recipient_emails"]>("recipient_emails")
      .select("*")
      .eq('snaps_id', snaps.id);
    if (emailRes.error || !emailRes.data || emailRes.data.length === 0) {
      res.status(500).end("could not notify recipient");
      return;
    }
    const msg = {
      templateId: "d-5aff4fd54154455c8afddef351c648d9",
      from: {
        name: "GiveSnaps",
        email: "hello@givesnaps.xyz",
      },
      personalizations: [
        {
          to: emailRes.data[0].recipient_email,
        }
      ]
    }
    // TODO(gracew): make this idempotent
    const sendgridRes = await sendgrid.send(msg);
    console.log(sendgridRes);
    res.status(200).end("could not notify recipient");
  }
  return;
}

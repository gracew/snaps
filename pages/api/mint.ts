import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import type { NextApiRequest, NextApiResponse } from 'next';
import ERC721NFT from "../../ERC721NFT.json";
import { definitions } from "../../types/supabase";
import { runMiddleware, validateJwt } from "./middleware";
import { supabase } from "./supabase";

// @ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const categoryIpfsMap: Record<string, string> = {
  spc_nurture: "QmdfmoP1LWcGsuDxvJuD4aC18dhXGkrypDWjAGKD2xHDKb",
  spc_scale: "QmZ7yBnzGL1zRKo7eo5VorbgshoCX9mn2SGyunZ4N2rssM",
  spc_dig: "QmaQ2HMkqc3r9JJvjcmyx6zFiB7fxvfUXW8Wc1qN6qfX5X",
  spc_own: "QmVk3JURy2ChnydXfQY7B5RhuYGHs6XjjTS3Vz8V59dKaE",
};

const provider = new ethers.providers.InfuraProvider(process.env.NETWORK || "maticmum", "a71874bbcb6a450398f24a7bbd436eda")
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, ERC721NFT.abi, signer);

async function getRecipientWalletAddress(snaps: definitions["snaps"]) {
  if (snaps.recipient_wallet_address) {
    return snaps.recipient_wallet_address;
  }
  const { data, error } = await supabase
    .from<definitions["users"]>("users")
    .select("*")
    .eq("email", snaps.recipient_email);
  if (error || !data || data.length === 0) {
    return undefined;
  }
  return data[0].wallet_address;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, validateJwt);
  const snapsRes = await supabase
    .rpc('get_snaps_with_sender', { snaps_id: req.body.id });

  if (snapsRes.error) {
    res.status(500).end();
    return;
  }
  if (!snapsRes.data || snapsRes.data.length === 0) {
    res.status(404).end();
    return;
  }

  const snaps = snapsRes.data[0];
  if (!snaps.note || !snaps.category) {
    res.status(400).end("incomplete snap");
    return;
  }
  if (!categoryIpfsMap[snaps.category]) {
    res.status(400).end("unknown category: " + snaps.category);
    return;
  }

  const recipientAddress = await getRecipientWalletAddress(snaps);
  if (!recipientAddress) {
    res.status(400).end("missing recipient wallet address");
    return;
  }

  const metadata = {
    name: "Snaps",
    description: `${snaps.note}

From: ${snaps.sender_fname || snaps.sender_wallet_address}`,
    image: `https://ipfs.infura.io/ipfs/${categoryIpfsMap[snaps.category]}`,
  };
  const metadataResult = await client.add(JSON.stringify(metadata));
  const url = `https://ipfs.infura.io/ipfs/${metadataResult.path}`;
  console.log(`metadata url for snaps ${snaps.id}: ${url}`);

  const transaction = await contract.mintToCaller(recipientAddress, url);
  const tx = await transaction.wait();
  const event = tx.events[0];
  console.log("transaction event: ", event);
  const tokenId = event.args[2].toNumber();
  console.log("token id: ", tokenId);

  const { data, error } = await supabase
    .from("snaps")
    .update({
      minted_at: new Date().toISOString(),
      minted_token_id: tokenId,
    })
    .eq('id', snaps.id);
  if (error || !data || data.length === 0) {
    res.status(500).end("failed to update mint status");
    return;
  }
  res.status(200).json(data[0]);
}

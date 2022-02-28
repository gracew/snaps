import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import type { NextApiRequest, NextApiResponse } from 'next';
import ERC721NFT from "../../ERC721NFT.json";

// @ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // TODO(require this)
  // await runMiddleware(req, res, validateJwtIfExists);
  // first, upload image and metadata to IPFS
  //const blob = await fetch("/spc/nurture.png").then((r) => r.blob());
  //const imageResult = await client.add(blob);

  /*const data = {
    name: "Snaps: International Women's Day 2022",
    description: "test description",
    image: `https://ipfs.infura.io/ipfs/QmStkJ2xYkg6tVKzXG551aMt4L6DHiehTZ41aQHWUtetT6`,
  };
  const metadataResult = await client.add(JSON.stringify(data));
  const url = `https://ipfs.infura.io/ipfs/${metadataResult.path}`;
  */
  const url = "https://ipfs.infura.io/ipfs/QmbJuMhuRKrmjPgm7ARBfZJGt1UwcMmNhFN6ky4tFdACYi"
  console.log("metadata url: ", url);


  const provider = new ethers.providers.InfuraProvider("maticmum", "a71874bbcb6a450398f24a7bbd436eda")
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  // Step 1: Load the NFT contract
  const address = "0x967442D189Be3d4Dc6457115C1CA67F7d76D3330";
  const contract = new ethers.Contract(address, ERC721NFT.abi, signer);

  // Step 2: give it the URI
  let transaction = await contract.mintToCaller("0x9B572394d0f7bE31967D02E84D1C1D19c5E7d3E1", url);
  let tx = await transaction.wait();
  let event = tx.events[0];
  console.log("transaction event: ", event);
  let value = event.args[2];
  let tokenId = value.toNumber();
  console.log("token id: ", tokenId);
  await transaction.wait();
  const openSeaUrl = `https://testnets.opensea.io/assets/mumbai/${address}/${tokenId}`;
  console.log(openSeaUrl);
}

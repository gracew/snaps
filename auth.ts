import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Web3 from "web3";

export enum AuthType {
  EMAIL = "email",
  ADDRESS = "address",
}

export function getWeb3Modal() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "9d0e761f26a04fad965b7d1cac96176f",
      }
    }
  }
  return new Web3Modal({
    network: "polygon",
    cacheProvider: true,
    providerOptions
  });
}

export async function connect() {
  const web3Modal = getWeb3Modal();
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();

  return {
      web3,
      account: accounts[0],
  };
};

export function signatureInput(nonce: string) {
  return `Sign this message to prove you have access to this wallet and we will sign you in.

This won't cost you any Ether.

Nonce: ${nonce}`;
}
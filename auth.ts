import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3 from "web3";
import Web3Modal from "web3modal";

const INFURA_ID = "9d0e761f26a04fad965b7d1cac96176f";

export enum AuthType {
  EMAIL = "email",
  ADDRESS = "address",
}

export function getWeb3Modal() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID,
      }
    },
    walletlink: {
      package: WalletLink,
      options: {
        infuraId: INFURA_ID,
        rpc: "https://mainnet.infura.io/v3/",
      }
    }
  };

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

export async function walletLogin({ web3, account }: { web3: Web3, account: string }) {
  const { nonce, validAddress } = await fetch('/api/login/getNonce', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ address: account }),
  }).then(res => res.json());

  if (validAddress) {
    return true;
  }

  try {
    const signature = await web3.eth.personal.sign(signatureInput(nonce), account, "");

    await fetch('/api/login/verifySignature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address: account, signature }),
    });

    return true;
  } catch (e) {
    return false;
  }
}


export function signatureInput(nonce: string) {
  return `Sign this message to prove you have access to this wallet and we will log you in.

This won't cost you anything.

Nonce: ${nonce}`;
}
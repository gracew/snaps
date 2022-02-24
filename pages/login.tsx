import WalletConnectProvider from "@walletconnect/web3-provider";
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import GoogleLogin from "react-google-login";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Or from "../components/or";
import SecondaryButton from "../components/secondaryButton";
import { signatureInput } from "./api/auth";

const GiveTo: NextPage = () => {
  const router = useRouter();

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "9d0e761f26a04fad965b7d1cac96176f",
      }
    }
  };

  async function login({ web3, account }: { web3: Web3, account: string }) {
    const { nonce, validToken } = await fetch('/api/login/getNonce', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address: account }),
    }).then(res => res.json());

    if (validToken) {
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

  async function connect() {
    const web3Modal = new Web3Modal({
      network: "polygon",
      cacheProvider: true,
      providerOptions,
    });

    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    await login({ web3, account: accounts[0] });
    router.push("/snaps")
  }

  function onGoogleSuccess(res: any) {
    console.log("success", res);
    router.push("/snaps")
  }

  function onGoogleFailure(res: any) {
    console.log("failure", res);
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-96 flex flex-col">
        <h1 className="text-2xl font-bold mt-5 mb-3">
          Log In
        </h1>
        <GoogleLogin
          clientId="314131181818-4oos4568l2idp0t71u5lembd9qb55f9e.apps.googleusercontent.com"
          onSuccess={onGoogleSuccess}
          onFailure={onGoogleFailure}
          render={renderProps => (
            <SecondaryButton
              text="Log In with Google"
              onClick={renderProps.onClick}
            />
          )}
        />
        <Or />
        <SecondaryButton
          text="Connect Wallet"
          onClick={connect}
        />
      </div>
    </div>
  )
}

export default GiveTo;

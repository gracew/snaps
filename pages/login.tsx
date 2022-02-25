import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import Web3 from "web3";
import { connect, signatureInput } from "../auth";
import Or from "../components/or";
import SecondaryButton from "../components/secondaryButton";

const Login: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then(({ address, email }) => {
        if (address || email) {
          router.push("/snaps")
        }
      });
  }, []);

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

  async function onClickConnect() {
    const res = await connect();
    const success = await login(res);
    if (success) {
      router.push("/snaps")
    }
    // TODO: handle failure case
  }

  async function onGoogleSuccess(res: GoogleLoginResponse) {
    await fetch('/api/login/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tokenId: res.tokenId }),
    });
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
          onSuccess={onGoogleSuccess as any}
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
          onClick={onClickConnect}
        />
      </div>
    </div>
  )
}

export default Login;

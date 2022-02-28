import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import SecondaryButton from "./secondaryButton";

interface GoogleButtonProps {
  onSuccess?: () => void;
}

const GoogleButton = ({ onSuccess }: GoogleButtonProps) => {
  async function onGoogleSuccess(res: GoogleLoginResponse) {
    await fetch('/api/login/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tokenId: res.tokenId }),
    });
    if (onSuccess) {
      onSuccess();
    }
  }

  function onGoogleFailure(res: any) {
    console.log("failure", res);
  }

  return (
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
  )
}

export default GoogleButton;

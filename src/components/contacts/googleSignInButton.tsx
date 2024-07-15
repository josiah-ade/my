import useGoogleAuthState from "@/providers/stores/googleAuthStore";
import { useEffect, useRef, useState } from "react";
import Button from "../button/button";
import Script from "next/script";

declare global {
  interface Window {
    gapi: any;
  }
}

interface IAuthResponse {
  Qc: { access_token: string; id_token: string };
  oy: { hz: string };
}

interface IProps {
  id?: string;
}

export default function GoogleSignInButton({ id }: IProps) {
  const setAuthData = useGoogleAuthState((state) => state.setAuthData);
  const [gInit, setGInit] = useState(false);
  const { authData } = useGoogleAuthState();
  const signInButtonRef = useRef<HTMLDivElement>(null);

  const handleGoogleSignInClick = () => {
    if (signInButtonRef.current) {
      signInButtonRef.current.querySelector("div")?.click();
    }
  };
  const initializeGoogleSignIn = () => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          clientId: "975054020342-94luf0u5hrmc8v6iaq3e48r1hh9hj6ln.apps.googleusercontent.com",
          plugin_name: "Expertnaire",
        })
        .then(() => {
          setGInit(true);
          window.gapi.signin2.render(id ?? "gAuthContainer", {
            scope: "profile email https://www.googleapis.com/auth/contacts.readonly",
            width: 240,
            height: 50,
            theme: "dark",
            onsuccess: onSignIn,
          });
        });
    });
  };

  useEffect(() => {
    if (window.gapi) initializeGoogleSignIn();
  }, [window.gapi]);

  const onSignIn = async (googleUser: IAuthResponse) => {
    const idToken = googleUser.Qc.id_token;
    const accessToken = googleUser.Qc.access_token;
    const email = googleUser.oy.hz;
    setAuthData({ idToken, accessToken, email });
  };

  const signOut = async () => {
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      setAuthData({ idToken: "", accessToken: "", email: "" });
    } catch (e) {
      console.log(e);
    }
  };

  const isLoggedIn = !!authData.accessToken;
  return (
    <div>
      <Script src="https://apis.google.com/js/platform.js" onLoad={initializeGoogleSignIn} />
      <div
        id={id ?? "gAuthContainer"}
        ref={signInButtonRef}
        data-onsuccess="onSignIn"
        style={{ display: "none" }}
      ></div>
      <Button
        disabled={!gInit}
        onClick={isLoggedIn ? signOut : handleGoogleSignInClick}
        className="text-gray-600 px-4 py-2 border-2 border-gray-400 rounded-lg flex items-center space-x-2 focus:outline-none"
      >
        <img src="/goggle-icon.png" alt="Google" className="w-5 h-5 mr-0.5" />

        {isLoggedIn ? (
          <>
            <span>{authData.email}</span> <span> - </span> <span className="text-secondary-500">Sign Out</span>
          </>
        ) : (
          <span> Connect Google Contacts </span>
        )}
      </Button>
    </div>
  );
}

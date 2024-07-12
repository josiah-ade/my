import { useAuthContext } from "@/providers/context/auth";
import { useGetUserBroadcast } from "@/providers/hooks/query/getbroadcast";
import useGoogleAuthState from "@/providers/stores/googleAuthStore";
import { useEffect, useRef, useState } from "react";
import Button from "./button/button";

declare global {
  interface Window {
    gapi: any;
  }
}

export default function GoogleSignIn() {
  const setGoogle = useGoogleAuthState((state) => state.setGoogle);
  const { Google } = useGoogleAuthState();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState();
  const signInButtonRef = useRef<HTMLDivElement>(null);

  const handleGoogleSignInClick = () => {
    if (signInButtonRef.current) {
      signInButtonRef.current.querySelector("div")?.click();
    }
  };

  useEffect(() => {
    // Initialize the Google Sign-In API
    const initializeGoogleSignIn = () => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2
          .init({
            clientId: "975054020342-94luf0u5hrmc8v6iaq3e48r1hh9hj6ln.apps.googleusercontent.com",
            plugin_name: "Expertnaire",
          })
          .then(() => {
            // Render the sign-in button after auth2 is initialized
            window.gapi.signin2.render("g-signin2", {
              scope: "profile email https://www.googleapis.com/auth/contacts.readonly",
              width: 240,
              height: 50,
              longtitle: true,
              theme: "dark",
              onsuccess: onSignIn,
            });
          });
      });
    };

    // Load the Google API script
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);
  }, []);

  const onSignIn = async (googleUser: any) => {
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;
    const accessToken = googleUser.getAuthResponse().access_token;
    const googleId = profile.getId();
    const value = [{ idToken: idToken, accessToken: accessToken }];
    // console.log(profile, "value");
    setProfile(profile);
    setGoogle(value);
    setIsSignedIn(true);

    try {
      // Fetch user's Google Contacts
      // const contactsResponse = await fetch(
      //   `https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   }
      // );
      // if (!contactsResponse.ok) {
      //   throw new Error("Failed to fetch contacts");
      // }
      // const contactsData = await contactsResponse.json();
      // console.log("Contacts Data: ", contactsData);
      // Process or send the contacts data to your backend if needed
      // const response = await fetch("http://localhost:8000/api/v1/contact/google/import", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${authData.token}`,
      //   },
      //   body: JSON.stringify({ contacts: contactsData.connections, broadcastId: "666b12dcc5bab1a0026436ca" }),
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to import contacts");
      // }
      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error("Error during sign-in or API request:", error);
    }
  };

  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      const value = [{ idToken: "", accessToken: "" }];
      setGoogle(value);
      setIsSignedIn(false);
      // Perform additional sign-out actions if necessary
    });
  };

  return (
    <div>
      <div id="g-signin2" ref={signInButtonRef} data-onsuccess="onSignIn" style={{ display: "none" }}></div>
      {Google[0]?.accessToken != "" ? (
        <Button
          onClick={signOut}
          className="text-gray-600 px-4 py-2 border-2 border-gray-400 rounded-lg flex items-center space-x-2 focus:outline-none"
        >
          <img src="/goggle-icon.png" alt="Google" className="w-5 h-5 mr-2" />
          <span>{profile?.hz}</span> -<span className="text-secondary-500">Sign Out</span>
        </Button>
      ) : (
        <Button
          onClick={handleGoogleSignInClick}
          className="text-gray-600 px-4 py-2 border-2 border-gray-400 rounded-lg flex items-center  focus:outline-none"
        >
          <img src="/goggle-icon.png" alt="Google" className="w-5 h-5 mr-2" />
          Connect Google Contacts
        </Button>
      )}
    </div>
  );
}

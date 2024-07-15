import { create } from "zustand";

interface IGoogleAuth {
  idToken?: string;
  accessToken?: string;
  email?: string;
}

interface GoogleAuthState {
  authData: IGoogleAuth;
  setAuthData: (data: IGoogleAuth) => void;
}

const useGoogleAuthState = create<GoogleAuthState>((set) => ({
  authData: {},
  setAuthData: (data) => {
    set(() => ({ authData: data }));
  },
}));

export default useGoogleAuthState;

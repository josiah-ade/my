import { create } from "zustand";

interface AuthInterFace {
  idToken: string;
  accessToken: string;
}

interface GoogleAuthState {
  Google: AuthInterFace[];
  setGoogle: (data: AuthInterFace[]) => void;
}

const useGoogleAuthState = create<GoogleAuthState>((set) => ({
  Google: [],
  setGoogle: (data) => {
    set(() => ({ Google: data }));
  },
}));

export default useGoogleAuthState;

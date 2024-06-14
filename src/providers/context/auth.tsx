import { ICreateData } from "@/lib/interface/ITabel";
import { AuthResponse, ILogin } from "@/lib/interface/Ilogin";
import { CreateUserModel, UserModel } from "@/lib/interface/Iregister";
import { setToken } from "@/services/api/_config";
import axios, { AxiosResponse } from "axios";
import router from "next/router";
import React from "react";
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Session {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  auth?: AuthResponse ;
  AdminLogin: (data: ILogin) => void;
  logout: () => void;
  islLoggedIn: boolean;
  loaded: boolean;
}

const usersContext = createContext<AuthContextType>({
  auth: undefined,
  AdminLogin: async () => {},
  logout: () => {},
  islLoggedIn: false,
  loaded: true,
});

export default function Context({ children }: { children: ReactNode }) {
  const [error, setError] = React.useState<string>("");
  const [islLoggedIn, setILoggedIn] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [auth, setAuth] = useState<AuthResponse>();

  
  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        let tokens = JSON.parse(storedToken);
        if (tokens?.accessToken) {
          setToken(tokens.accessToken);
          setILoggedIn(true);
          setAuth(tokens);
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
    setLoaded(true);
  }, []);
  

  const AdminLogin = async (data: ILogin) => {
    const Promise = await axios
      .post<AuthResponse>("/auth/login", data)
      .then((res) => {
        const data = res.data;
        localStorage.setItem("token", JSON.stringify(res.data));
        setToken(res.data.accessToken);
        setAuth({ ...res.data });
        setILoggedIn(true);
        if(data.role == "user"){
          router.push("/usermanagement");
        }else{
          router.push("/selectAction");
        }
      })
      .catch((e) => {
        const message = e.response?.data?.message || "Network Error";
        if (Array.isArray(message)) {
          const error = message.join("\n");
          console.log({ error });
          throw new Error(error);
        }
        throw new Error(message);
      });
    return Promise;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setILoggedIn(false);
  };

  const UpdateToken = async (): Promise<Session | undefined> => {
    const storedSession = JSON.parse(localStorage.getItem("token") || "{}");
      const response = await axios.post("/auth/refresh", {
        refreshToken: storedSession.refreshToken,
      });
      const { token: refreshedSession } = response.data;
      if (!refreshedSession?.accessToken) {
        console.error("Refresh token failed. User needs to re-authenticate.");
        localStorage.removeItem("token");
        return undefined;
      }
      localStorage.setItem(
        "token",
        JSON.stringify({
          ...storedSession,
          accessToken: refreshedSession.accessToken,
          refreshToken: refreshedSession.refreshToken,
          refreshTokenExpiry: refreshedSession.refreshTokenExpiry || Date.now() + 15 * 60 * 1000,
        })
      );

      return refreshedSession;
  };

  const value = {
    auth,
    AdminLogin,
    error,
    logout,
    loaded,
    islLoggedIn,
    UpdateToken,
  };

  return (
    <>
      <usersContext.Provider value={value}>{children}</usersContext.Provider>
    </>
  );
}
const useAuthContext = () => useContext(usersContext);
export { useAuthContext };

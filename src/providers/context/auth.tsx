import { AuthResponse, ILogin, ISignUp } from "../../typings/interface/login";
import { setToken } from "../services/config";
import axios, { AxiosResponse } from "axios";
import router from "next/router";
import React from "react";
import { ReactElement, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useGetUsersAcount } from "../hooks/query/getaccount";
import { useGetUserBroadcast } from "../hooks/query/getbroadcast";
import { useQueryClient } from "react-query";
import { useUsersStats } from "../hooks/query/statistics";

interface Session {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  auth?: AuthResponse;
  AdminLogin: (data: ILogin) => void;
  SignUpApi: (data: ISignUp) => void;
  logout: () => void;
  islLoggedIn: boolean;
  loaded: boolean;
}

const usersContext = createContext<AuthContextType>({
  auth: undefined,
  AdminLogin: async () => {},
  SignUpApi: async () => {},
  logout: () => {},
  islLoggedIn: false,
  loaded: false,
});

export default function Context({ children }: { children: ReactNode }) {
  const [error, setError] = React.useState<string>("");
  const [islLoggedIn, setILoggedIn] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [auth, setAuth] = useState<AuthResponse>();
  // const { data: stats } = useUsersStats()

  const {} = useGetUsersAcount({ loadingConfig: { displayLoader: false }, enabled: islLoggedIn });
  const {} = useGetUserBroadcast({ loadingConfig: { displayLoader: false }, enabled: islLoggedIn });
  const {} = useUsersStats({ loadingConfig: { displayLoader: false }, enabled: islLoggedIn });

  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        let tokens = JSON.parse(storedToken);
        if (tokens?.token) {
          setToken(tokens.token);
          setILoggedIn(true);
          setAuth(tokens);
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
    setLoaded(true);
  }, []);

  const SignUpApi = async (data: ISignUp) => {
    const Promise = await axios
      .post<AuthResponse>("/auth/signup", data)
      .then((res) => {
        const data = res.data;
        localStorage.setItem("token", JSON.stringify(res?.data));
        setToken(res.data?.token);
        setAuth({ ...res.data });
        setILoggedIn(true);
        router.push("/user");
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
  const AdminLogin = async (data: ILogin) => {
    const Promise = await axios
      .post<AuthResponse>("/auth/signin", data)
      .then((res) => {
        const data = res.data;
        localStorage.setItem("token", JSON.stringify(res.data));
        setToken(res.data?.token);
        setAuth({ ...res.data });
        setILoggedIn(true);
        router.push("/user");
        // if(data.role == "user"){
        //   router.push("/usermanagement");
        // }else{
        //   router.push("/selectAction");
        // }
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

  // const UpdateToken = async (): Promise<Session | undefined> => {
  //   const storedSession = JSON.parse(localStorage.getItem("token") || "{}");
  //     const response = await axios.post("/auth/refresh", {
  //       refreshToken: storedSession.refreshToken,
  //     });
  //     const { token: refreshedSession } = response.data;
  //     if (!refreshedSession?.accessToken) {
  //       console.error("Refresh token failed. User needs to re-authenticate.");
  //       localStorage.removeItem("token");
  //       return undefined;
  //     }
  //     localStorage.setItem(
  //       "token",
  //       JSON.stringify({
  //         ...storedSession,
  //         accessToken: refreshedSession.accessToken,
  //         refreshToken: refreshedSession.refreshToken,
  //         refreshTokenExpiry: refreshedSession.refreshTokenExpiry || Date.now() + 15 * 60 * 1000,
  //       })
  //     );

  //     return refreshedSession;
  // };

  const value = {
    auth,
    AdminLogin,
    error,
    logout,
    loaded,
    islLoggedIn,
    // UpdateToken,
    SignUpApi,
  };

  return (
    <>
      <usersContext.Provider value={value}>{children}</usersContext.Provider>
    </>
  );
}
const useAuthContext = () => useContext(usersContext);
export { useAuthContext };

import { setToken } from "@/core/config/api.config";
import { NotificationType } from "@/core/types/enum/notification.enum";
import { AuthResponse, ILogin } from "@/core/types/interfaces/auth";
import useNotificationStore from "@/stores/notificationStore";
import axios from "axios";
import router from "next/router";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  auth?: AuthResponse;
  login: (data: ILogin) => void;
  logout: (callback?: () => void) => void;
  islLoggedIn: boolean;
  loaded: boolean;
}

const usersContext = createContext<AuthContextType>({
  auth: undefined,
  login: async () => {},
  logout: () => {},
  islLoggedIn: false,
  loaded: false,
});

export default function AuthContext({ children }: { children: ReactNode }) {
  //   const [error, setError] = useState<string>("");
  const [islLoggedIn, setILoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [auth, setAuth] = useState<AuthResponse>();
  const setNotification = useNotificationStore((state) => state.displayNotification);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    //remove after testing
    setAuth({ fullname: "frn", token: "dsf", refreshToken: "dsfd", email: "dsfd", id: "323" });
    setILoggedIn(true);

    if (storedToken) {
      try {
        const tokens = JSON.parse(storedToken);
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

  const login = async (data: ILogin) => {
    const Promise = await axios
      .post<AuthResponse>("/auth/signin", data)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        setToken(res.data?.token);
        setAuth({ ...res.data });
        setILoggedIn(true);
        setNotification({
          type: NotificationType.success,
          content: {
            title: "Login Successful",
            text: "Login Successful: Welcome back!",
          },
        });
        router.push("/user");
      })
      .catch((e) => {
        const message = e.response?.data?.message || "Network Error";
        if (Array.isArray(message)) {
          const error = message.join("\n");
          throw new Error(error);
        }
        throw new Error(message);
      });
    return Promise;
  };

  const logout = (callback?: () => void) => {
    localStorage.removeItem("token");
    setILoggedIn(false);
    if (callback) callback();
  };

  const value = { auth, login, logout, loaded, islLoggedIn };

  return <>{loaded ? <usersContext.Provider value={value}>{children}</usersContext.Provider> : <> </>}</>;
}
const useAuthContext = () => useContext(usersContext);
export { useAuthContext };

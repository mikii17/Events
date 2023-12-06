import { createContext, useCallback, useEffect, useState } from "react";
import axios_client from "../api/axios_client";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface Auth {
  token: string;
}

type AuthContextType = {
  auth: Auth | null | undefined;
  login: (email: string, password: string) => Promise<void>;
  create_admin: (email: string) => Promise<void>;
  signout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth | null | undefined>(undefined); // undefined: not yet fetched, null: not logged in, Auth: logged in

  const refresh = async () => {
    const response = await axios_client.get("/refresh", {
      withCredentials: true,
    });
    const token = response.data?.accessToken as string || null;
    setAuth(token ? { token } : null);
    return response.data.accessToken;
  };

  const axios_private = useAxiosPrivate({ token: auth?.token || "", refresh });

  const login = useCallback(async (email: string, password: string) => {
    const response = await axios_client.post("/auth/login", {
      email,
      password,
    });
    setAuth({ token: response.data.accessToken });
  }, []);

  const create_admin = async (email: string) => {
    await axios_private.post("/auth/signup", {
      email,
    });
  };

  const signout = async () => {
    await axios_private.post("/auth/signout");
    setAuth(null);
  };

  useEffect(() => {
    refresh();
  }, []); // This syncs the auth state with the server on page load

  return (
    <AuthContext.Provider value={{ auth, login, create_admin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

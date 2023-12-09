import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosClient } from "../api/axios_client";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface Auth {
  token: string;
}

type AuthContextType = {
  auth: Auth | null | undefined;
  login: (email: string, password: string) => Promise<void>;
  create_admin: (email: string) => Promise<void>;
  signout: () => Promise<void>;
  refresh: () => Promise<string>;
  changePassword: (password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth | null | undefined>(undefined); // undefined: not yet fetched, null: not logged in, Auth: logged in

  const refresh = async () => {
    try {
      const response = await axiosClient.post("/auth/refresh", {
        withCredentials: true,
      });
      const token = (response.data?.access_token as string) || null;
      setAuth(token ? { token } : null);
      return response.data.access_token;
      
    } catch (error: any) {
      setAuth(null);
      return "";
    }
  };

  const axios_private = useAxiosPrivate({ token: auth?.token || "", refresh });

  const login =  async (email: string, password: string) => {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      setAuth({ token: response.data.access_token });
    };
  const create_admin = 
    async (email: string) => {
      await axios_private.post("/auth/signup", {
        email,
      });
    };

  const signout = async () => {
    await axios_private.post("/auth/logout");
    setAuth(null)};

  useEffect(() => {
    refresh();
  }, []); // This syncs the auth state with the server on page load

  const changePassword = async (password: string) => {
    await axios_private.patch("/admin", {
      password,
    });
  }
  
  return (
    <AuthContext.Provider value={{ auth, login, create_admin, signout, refresh, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context.auth;
};

export const useRefresh = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useRefresh must be used within a AuthProvider");
  }
  return context.refresh;
};

export const useLogin = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a AuthProvider");
  }
  return context.login;
};

export const useCreateAdmin = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useCreateAdmin must be used within a AuthProvider");
  }
  return context.create_admin;
};

export const useSignout = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSignout must be used within a AuthProvider");
  }
  return context.signout;
};

export const useChangePassword = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useChangePassword must be used within a AuthProvider");
  }
  return context.changePassword;
}


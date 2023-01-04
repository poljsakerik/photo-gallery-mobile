import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { APIToken } from "../../helper/axios";
import {
  removeLoginTokens,
  setLoginTokens,
} from "../../screens/login/helper/helper";

export type JWTUser = {
  exp: number;
  iat: number;
  jti: string;
  token_type: "access" | "refresh";
  user_id: number;
};

type AuthContext = {
  user?: JWTUser | null;
  setUser: Dispatch<SetStateAction<JWTUser | null>>;
  login: (token: APIToken) => void;
  logout: () => void;
};

const authContext = createContext<AuthContext>({
  setUser: () => {},
  login: (_token) => {},
  logout: () => {},
});

interface IProps {
  children: ReactNode;
}

async function setStorageItem(
  key: string,
  setter: Dispatch<SetStateAction<any>>
) {
  const data = await AsyncStorage.getItem(key);
  if (data) {
    setter(JSON.parse(data));
  }
}

function AuthContextProvider({ children }: IProps) {
  const [user, setUser] = useState<JWTUser | null>(null);

  function login(token: APIToken) {
    setLoginTokens(token).then((data) => setUser(data));
  }

  function logout() {
    removeLoginTokens().then(() => {
      setUser(null);
    });
  }

  useEffect(() => {
    setStorageItem("user", setUser);
  }, []);

  return (
    <authContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;

export const useCurrentUser = () => {
  return useContext(authContext);
};

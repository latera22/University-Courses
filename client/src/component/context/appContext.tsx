import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import axios from "axios";

interface User {
  email: string;
}

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userData: User | null;
  setUserData: Dispatch<SetStateAction<User | null>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);

  // Check if user is already logged in on page load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/auth/me", {
          withCredentials: true, // Ensure cookies are sent
        });
        if (res.data) {
          setIsLoggedIn(true);
          setUserData(res.data);
        }
      } catch (err) {
        console.error("User is not authenticated", err);
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuth();
  }, []);

  const value: AppContextType = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

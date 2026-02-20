import { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import Loader from "../common/Loader"; // adjust path if needed
import { AppContext, User, AppContextType } from "./appContext"; // import the context

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || "";

    const checkAuth = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/auth/me`, {
          withCredentials: true,
        });

        if (res.data && res.data.email) {
          console.log("✅ Auth check successful. User data:", res.data);
          setIsLoggedIn(true);
          setUserData(res.data);
        } else {
          console.log("Auth check returned no user data. Response:", res.data);
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (err) {
        console.error("User is not authenticated", err);
        setIsLoggedIn(false);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const value: AppContextType = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

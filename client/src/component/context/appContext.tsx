import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import axios from "axios"; // Keep axios import
import Loader from "../common/Loader"; // Corrected import path

interface User {
  email: string;
}

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userData: User | null;
  setUserData: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  // Check if user is already logged in on page load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          withCredentials: true, // Ensure cookies are sent
        });
        // More robust check: Does the response data actually contain a user?
        // We check for a specific property like 'email' to be sure.
        if (res.data && res.data.email) {
          console.log("✅ Auth check successful. User data:", res.data);
          setIsLoggedIn(true);
          setUserData(res.data);
        } else {
          // This block runs if the API call succeeded but returned no user data.
          console.log("Auth check returned no user data. Response:", res.data);
          // Handle cases where API returns 200 OK but no user data
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (err) {
        console.error("User is not authenticated", err);
        setIsLoggedIn(false);
        setUserData(null);
      } finally {
        setLoading(false); // Stop loading once check is complete
      }
    };

    checkAuth();
  }, []);

  // While checking auth, show a loading indicator to prevent the rest of the app from rendering prematurely.
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

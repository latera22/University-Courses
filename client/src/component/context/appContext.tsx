import { createContext, Dispatch, SetStateAction } from "react";

// Minimal User type
export type User = {
  id?: string;
  name?: string;
  email?: string;
};

// Context shape
export type AppContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userData: User | null;
  setUserData: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
};

// Default value for context
export const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userData: null,
  setUserData: () => {},
  loading: true,
});
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { auth, db, doc, getDoc, setDoc } from "../../Config/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";

interface AuthContextProps {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  signOut: () => Promise<void>;
}

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  additionalInfo?: string;
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  userLoggedIn: false,
  loading: true,
  setCurrentUser: () => null,
  signOut: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

const signOut = async () => {
  await auth.signOut();
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initialiseUser);
    return unsubscribe;
  }, []);

  const initialiseUser = async (user: User | null) => {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  };

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    setCurrentUser,
    signOut,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

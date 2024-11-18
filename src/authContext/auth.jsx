import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };
  const authStateChange = async (user) => {
    setIsLoading(true);
    if (!user) {
      clear();
      return;
    }
    if (user) {
      setAuthUser({
        uid: user.uid,
        email: user.email,
        username: user.displayName,
      });
    }
    setIsLoading(false);
  };

  const logOut = () => {
    console.log("not done");
    try {
      signOut(auth).then(() => clear());
    } catch (error) {
      console.log(error);
    }

    console.log("done");
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChange);
    return () => unsubscribe();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ authUser, isLoading, logOut }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

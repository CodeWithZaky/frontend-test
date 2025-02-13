import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user: {
    username?: string;
    password?: string;
  };
  status: string;
  setUser: (userData: { username?: string; password?: string }) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const initialAuthState: AuthContextType = {
  user: {},
  status: "unauthenticated",
  setUser: () => {},
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState(initialAuthState);

  const setUser = (userData: { username?: string; password?: string }) => {
    setAuthState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        ...userData,
      },
    }));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setAuthState({
        user: {
          username: userData.username,
          password: userData.password,
        },
        status: "authenticated",
        setUser: setUser,
      });
    } else {
      setAuthState({
        ...initialAuthState,
        setUser: setUser,
      });
    }
  }, []);

  const contextValue: AuthContextType = {
    ...authState,
    setUser: setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

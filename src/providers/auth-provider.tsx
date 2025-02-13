import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user: {
    username?: string;
    password?: string;
  };
  status: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const initialAuthState: AuthContextType = {
  user: {},
  status: "unauthenticated",
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState(initialAuthState);

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
      });
    } else {
      setAuthState(initialAuthState);
    }
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

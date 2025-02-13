import { AuthContext } from "@/providers/auth-provider";
import { useContext } from "react";

export default function useSession() {
  const session = useContext(AuthContext);
  return session;
}

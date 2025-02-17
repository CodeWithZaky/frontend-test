import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

export function withAuth<P extends object>(Component: ComponentType<P>) {
  return function WithAuth(props: P): React.ReactNode {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
      if (session?.status === "unauthenticated") {
        router.push("/login");
      }
    }, [router, session?.status]);

    if (session?.status === "authenticated") {
      return <Component {...props} />;
    }

    return null;
  };
}

import useSession from "@/hooks/useSession";

export default function Home() {
  const session = useSession();

  return (
    <div className="flex justify-center items-center gap-5 min-h-72">
      <div className="flex flex-col gap-5">
        <p>Home Page</p>
        <div>
          {session?.status === "authenticated" && (
            <>
              <p>email: {session.user.username}</p>
              <p>passwprd: {session.user.password}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

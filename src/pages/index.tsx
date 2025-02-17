import ThemeSwitcher from "@/components/theme-switcher";
import useSession from "@/hooks/useSession";
import Link from "next/link";

export default function Home() {
  const session = useSession();

  return (
    <div className="flex justify-center items-center gap-5 py-20 min-h-72">
      <div className="flex flex-col gap-5">
        <h1 className="mx-auto text-stone-900 dark:text-stone-100 text-3xl">
          HOME PAGE
        </h1>

        {/* Card for Theme Switcher */}
        <div className="bg-stone-100 dark:bg-stone-800 shadow-md p-5 rounded-lg">
          <p className="font-bold text-stone-900 dark:text-stone-100">
            Change Theme
          </p>
          <ThemeSwitcher />
        </div>

        {/* Card for CRUD Link */}
        <div className="bg-stone-100 dark:bg-stone-800 shadow-md p-5 rounded-lg">
          <p className="text-stone-900 dark:text-stone-100">Go To CRUD item</p>
          <Link
            href="/crud"
            className="bg-gray-600 px-4 py-1 rounded text-stone-100 dark:text-stone-100 text-center"
          >
            CRUD
          </Link>
        </div>

        {/* Card for User Data */}
        <div className="bg-stone-100 dark:bg-stone-800 shadow-md p-5 rounded-lg">
          <p className="font-bold text-stone-900 dark:text-stone-100">
            User Data
          </p>

          {session?.status === "unauthenticated" ? (
            <>
              <p className="font-bold text-red-900">You are not logged in</p>
              <div className="flex items-center gap-2">
                <p className="text-stone-900 dark:text-stone-100">Login now</p>
                <Link
                  href="/login"
                  className="bg-gray-600 px-4 py-1 rounded text-stone-100 dark:text-stone-100 text-center"
                >
                  Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                {session?.status === "authenticated" && (
                  <>
                    <p className="text-stone-900 dark:text-stone-400">
                      username: {session.user.username}
                    </p>
                    <p className="text-stone-900 dark:text-stone-400">
                      password: {session.user.password}
                    </p>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const Sparator = () => <div className="bg-stone-700 w-full h-px" />;

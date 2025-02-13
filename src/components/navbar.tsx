import useSession from "@/hooks/useSession";
import Link from "next/link";
import { useState } from "react";

function Navbar() {
  return (
    <div className="relative">
      <div className="flex justify-between items-center border-stone-700 border-b h-[50px]">
        <Link href="/" className="px-5">
          Home
        </Link>
        <DropdownMenu />
      </div>
    </div>
  );
}

export default Navbar;

const DropdownMenu = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const session = useSession();

  const Logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="relative">
      {session?.status === "unauthenticated" && (
        <Link href="/login" className="px-5 cursor-pointer">
          Login
        </Link>
      )}
      {session?.status === "authenticated" && (
        <div>
          <span
            className="px-5 cursor-pointer"
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
          >
            {session.user?.username}
          </span>
          {isOpenDropdown && (
            <div className="right-0 z-10 absolute bg-stone-900 mt-2 py-1 border border-stone-700 rounded-md w-48">
              <Link
                href="/profile"
                className="block hover:bg-stone-600 px-4 py-2 text-gray-200 text-sm"
              >
                Profile
              </Link>
              <span
                onClick={Logout}
                className="block hover:bg-stone-600 px-4 py-2 text-gray-200 text-sm cursor-pointer"
              >
                Logout
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

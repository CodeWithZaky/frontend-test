import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const isLogin = true;

  return (
    <div className="flex justify-between items-center bg-stone-900 h-[50px]">
      <Link href="/" className="px-5">
        Home
      </Link>
      <div className="relative">
        {isLogin ? (
          <Link href="/login" className="px-5 cursor-pointer">
            Login
          </Link>
        ) : (
          <DropdownMenu />
        )}
      </div>
    </div>
  );
}

export default Navbar;

const DropdownMenu = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  return (
    <div className="top-0 left-0 absolute flex flex-col gap-2">
      <span
        className="px-5 cursor-pointer"
        onClick={() => setIsOpenDropdown(!isOpenDropdown)}
      >
        Zaky
      </span>
      {isOpenDropdown && (
        <div className="flex flex-col gap-2 px-5 py-3 border border-slate-700 rounded-md transition-all">
          <span>Profile</span>
          <span>Logout</span>
        </div>
      )}
    </div>
  );
};

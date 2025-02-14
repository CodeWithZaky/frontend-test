import useSession from "@/hooks/useSession";
import { AuthContext } from "@/providers/auth-provider";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

function Profile() {
  const [isEditUsername, setIsEditUsername] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const authContext = useContext(AuthContext);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/login");
    }
  }, []);

  if (!authContext) {
    return <div>AuthContext is null</div>;
  }

  const { user, setUser } = authContext;

  useEffect(() => {
    setNewUsername(user?.username || "");
    setNewPassword(user?.password || "");
  }, [user]);

  const handleUsernameSave = () => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { ...userData, username: newUsername };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser({ username: newUsername });
    setIsEditUsername(false);
  };

  const handlePasswordSave = () => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { ...userData, password: newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser({ password: newPassword });
    setIsEditPassword(false);
  };

  return (
    <div className="flex flex-col justify-center items-center py-20 rounded-lg w-full min-h-72">
      <h2 className="mb-6 font-semibold text-2xl">Profil Anda</h2>
      <div className="space-y-4 px-4 w-full max-w-md">
        {/* Username */}
        <div className="flex justify-between items-center bg-zinc-200 dark:bg-zinc-800 shadow-sm p-4 rounded-md">
          <div className="flex flex-col gap-2">
            <Label>Username:</Label>
            <Input
              onChange={(e) => setNewUsername(e.target.value)}
              disabled={!isEditUsername}
              value={newUsername}
            />
          </div>
          {isEditUsername ? (
            <div className="flex gap-2 transition-all">
              <button
                className="bg-blue-500 hover:bg-blue-700 px-2"
                onClick={handleUsernameSave}
              >
                Save
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 px-2"
                onClick={() => setIsEditUsername(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setIsEditUsername(true)}
            >
              Edit
            </button>
          )}
        </div>

        {/* Password */}
        <div className="flex justify-between items-center bg-zinc-200 dark:bg-zinc-800 shadow-sm p-4 rounded-md">
          <div className="flex flex-col gap-2">
            <Label>Password:</Label>
            <Input
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={!isEditPassword}
              value={newPassword}
            />
          </div>
          {isEditPassword ? (
            <div className="flex gap-2 transition-all">
              <button
                className="bg-blue-500 hover:bg-blue-700 px-2"
                onClick={handlePasswordSave}
              >
                Save
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 px-2"
                onClick={() => setIsEditPassword(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setIsEditPassword(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

const Input = ({
  onChange,
  disabled,
  value,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  value: string;
}) => {
  return (
    <input
      className="bg-zinc-700 disabled:bg-transparent px-3 disabled:px-0 rounded-sm ring-1 ring-zinc-500 disabled:ring-0 text-gray-900 dark:text-gray-400 transition-all"
      onChange={onChange}
      disabled={disabled}
      value={value}
    />
  );
};

const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <label className="font-medium text-gray-700 dark:text-gray-100">
      {children}
    </label>
  );
};

import { useState } from "react";

const loginDataExample = { username: "user123", password: "123123" };
export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = (FormData: FormData) => {
    setIsLoading(true);
    const username = FormData.get("username");
    const password = FormData.get("password");

    if (!username || !password) {
      setErrorMessage("Username or password is required");
      setIsLoading(false);
      return;
    }

    if (
      username !== loginDataExample.username ||
      password !== loginDataExample.password
    ) {
      setErrorMessage("Username or password is incorrect");
      setIsLoading(false);
      return;
    }

    const data = { username, password };
    localStorage.setItem("user", JSON.stringify(data));

    setIsLoading(false);

    alert("Login Success");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center py-20 border min-h-72">
      <div className="flex flex-col gap-5">
        <p className="text-2xl fonst-semibold">Login</p>
        <form className="flex flex-col gap-5" action={handleLogin}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="username">Username</Label>
            <Input name="username" id="username" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <button
            name="submit"
            disabled={isLoading}
            className="bg-stone-500/50 px-4 py-1 rounded-md w-fit"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

const Input = ({ name, id }: { name: string; id: string }) => {
  return (
    <input
      name={name}
      type={name}
      id={id}
      className="bg-stone-500/50 px-3 rounded-md w-fit"
    />
  );
};

const Label = ({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
}) => {
  return (
    <label htmlFor={htmlFor} className="text-stone-300">
      {children}
    </label>
  );
};

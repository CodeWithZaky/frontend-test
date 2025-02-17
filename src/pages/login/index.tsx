import { useState } from "react";

const LOGIN_DATA_EXAMPLE = { username: "user123", password: "123123" };

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
      username !== LOGIN_DATA_EXAMPLE.username ||
      password !== LOGIN_DATA_EXAMPLE.password
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
    <div className="flex justify-center items-center py-20 min-h-72">
      <div className="bg-stone-100 dark:bg-stone-800 shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="mb-6 font-semibold text-stone-900 dark:text-stone-100 text-2xl text-center">
          Login
        </h2>
        <form className="flex flex-col gap-4" action={handleLogin}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="username">Username</Label>
            <Input name="username" id="username" type="text" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" type="password" />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <button
            name="submit"
            disabled={isLoading}
            className="bg-stone-600 hover:bg-stone-700 px-4 py-2 rounded w-full text-stone-100 dark:text-stone-100 transition-colors duration-200"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-stone-900 dark:text-stone-100 text-sm text-center">
          Example: <br />
          <span className="font-mono">
            {`{ username: user123, password: 123123 }`}
          </span>
        </p>
      </div>
    </div>
  );
}

const Input = ({
  name,
  id,
  type,
}: {
  name: string;
  id: string;
  type: string;
}) => {
  return (
    <input
      name={name}
      type={type}
      id={id}
      className="bg-stone-200 dark:bg-stone-700 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-stone-500 w-full text-stone-900 dark:text-stone-100"
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
    <label
      htmlFor={htmlFor}
      className="font-medium text-stone-900 dark:text-stone-100 text-sm"
    >
      {children}
    </label>
  );
};

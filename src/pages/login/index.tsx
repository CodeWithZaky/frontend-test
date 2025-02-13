export default function Login() {
  // submit to local storage
  const handleLogin = (FormData: FormData) => {
    const email = FormData.get("email");
    const password = FormData.get("password");

    const data = { email, password };
    localStorage.setItem("user", JSON.stringify(data));
    alert("Login Success");
  };

  return (
    <div className="flex justify-center items-center min-h-72">
      <div className="flex flex-col gap-5">
        <p className="text-2xl fonst-semibold">Login</p>
        <form className="flex flex-col gap-5" action={handleLogin}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" />
          </div>

          <button
            name="submit"
            className="bg-slate-500/50 px-4 py-1 rounded-md w-fit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const Input = ({ name, id }: { name: string; id: string }) => {
  return (
    <input name={name} id={id} className="bg-slate-500/50 rounded-md w-fit" />
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
    <label htmlFor={htmlFor} className="text-slate-300">
      {children}
    </label>
  );
};

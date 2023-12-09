import { useState } from "react";
import { useLogin } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginFormData {
  email: string;
  password: string;
}
const Login = () => {
  const [searchParams, _] = useSearchParams();
  let redirectUrl = searchParams.get("redirectTo") || "/";
  redirectUrl = redirectUrl !== '/' ? atob(redirectUrl) : redirectUrl;

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = useLogin();
  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: ({email, password}:LoginFormData) => login(email, password),
    onSuccess: () => {
      setFormData({ email: "", password: "" });
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  if (isSuccess) {
    toast.success("Logged in successfully!");
    return <Navigate to={redirectUrl} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-primary px-6 py-8 rounded shadow-md w-full flex flex-col gap-10"
      >
        <h1 className="text-2xl text-center text-primary">Login</h1>
        {isError && <div className="text-red-500 text-center">Error has occured. Check the credentials.</div>}
        <div>
          <input
            type="email"
            className="block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            className="block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <button className="bg-accent p-2 rounded-lg" disabled={isPending}>
          Login
        </button>
      </form>
    </div>
  </div>
  )
}

export default Login
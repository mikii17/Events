import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useCreateAdmin } from "../../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const createAdmin = useCreateAdmin();
  const { mutate, isError, isPending } = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(email);
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={handleSubmit}
          className="bg-primary px-6 py-8 rounded shadow-md w-full flex flex-col gap-10"
        >
          <h1 className="text-2xl text-center text-primary">Create Admin</h1>
          {isError && <div className="text-red-500 text-center">Error</div>}
          <div>
            <input
              type="email"
              className="block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <button className="bg-accent p-2 rounded-lg" disabled={isPending}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import { useState } from "react"
import { useChangePassword } from "../../context/AuthContext"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

const ChangePassword = () => {
  const [password, setPassword] = useState<string>("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const changePassword = useChangePassword();
  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      setPassword("")
    },
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(password)
  }

  if (isSuccess) {
    toast.success("Password changed successfully!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={handleSubmit}
          className="bg-primary px-6 py-8 rounded shadow-md w-full flex flex-col gap-10"
        >
          <h1 className="text-2xl text-center text-primary">Change Password</h1>
          {isError && <div className="text-red-500 text-center">Error has occured.</div>}
          <div>
            <input
              type="password"
              className="block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <button className="bg-accent p-2 rounded-lg" disabled={isPending}>
            Change
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
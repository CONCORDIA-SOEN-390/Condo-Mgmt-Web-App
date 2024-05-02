"use client";
import { FcGoogle } from "react-icons/fc";
import { verifyUserSignUp } from "@/actions/SignupAction";
import { useFormState } from "react-dom";


export default function SignupForm() {
  const [state, onSubmit] = useFormState(verifyUserSignUp, null);

  

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm overflow-x-auto">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-950">Create an account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={onSubmit} method="POST" className="px-4 sm:px-0">
          <label htmlFor="email" className="block text-sl font-medium leading-6 text-gray-900">
            Email address*
          </label>
          <input id="email" name="email" autoComplete="email" className="block w-full rounded-md border-0 my-2 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-700 sm:text-sm sm:leading-6" />
          { state?.errors?.email && <p className="text-red-500 text-xs italic ">{state?.errors?.email[0]}</p>}
          <div className="flex items-center justify-between mt-3">
            <label htmlFor="password" className="block text-sl font-medium leading-6 text-gray-900 mt-3">
              Password*
            </label>
          </div>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 my-2 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-700 sm:text-sm sm:leading-6" />
          {state?.errors?.password &&
            state.errors?.password.map((error: string, index: number) => (
              <p key={index} className="text-red-500 text-xs italic">
                {error}
              </p>
            ))}
          <button type="submit" className="flex w-full justify-center rounded-md bg-yellow-950 hover:bg-yellow-900 mt-10 mb-10 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800">
            Sign Up
          </button>
        </form>
      </div>
      <div className="mt-6 flex justify-center ">
        <div className="items-center rounded-full border border-gray-300 bg-white p-1 shadow-sm hover:bg-slate-200">
          <FcGoogle size="40" />
        </div>
      </div>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { loginAction } from "@/actions/LoginAction";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    clearErrorMessage();
  }, []);

  const clearErrorMessage = () => {
    if (localStorage.getItem("loginError")) {
      setErrorMessage("");
      localStorage.removeItem("loginError");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const result = await loginAction(formData);
      if (result && result.message) {
        setErrorMessage(result.message);
      } else {
        clearErrorMessage();
        window.location.href = "/properties";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-950">Log into your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleFormSubmit} method="POST">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address*
          </label>
          <input id="email" name="email" autoComplete="email" className="block w-full rounded-md border-0 my-2 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-700 sm:text-sm sm:leading-6" />
          <div className="flex items-center justify-between mt-3">
            <label htmlFor="password" className="block text-sl font-medium leading-6 text-gray-900 mt-3">
              Password*
            </label>
            <Link href="#" className="text-sm font-semibold text-yellow-900 hover:text-yellow-700">
              Forgot password?
            </Link>
          </div>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 my-2 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-700 sm:text-sm sm:leading-6" />
          {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
          <button type="submit" className="flex w-full justify-center rounded-md bg-yellow-950 hover:bg-yellow-900 mt-10 mb-10 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800">
            Sign in
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

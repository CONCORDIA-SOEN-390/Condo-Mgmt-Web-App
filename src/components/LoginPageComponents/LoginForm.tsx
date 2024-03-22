"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/context/userInfoContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { changeId, changeEmail, changeProfileUrl, changeAccountType, changePhoneNumber, changeUserName } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        changeId(data.id);
        changeEmail(data['email']);
        changeProfileUrl(data.profileUrl);
        changeAccountType(data.accountType);
        changePhoneNumber(data.phoneNumber);
        changeUserName(data.userName)
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-950">Log into your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sl font-medium leading-6 text-gray-900">
            Email address*
          </label>
          <input id="email" name="email" autoComplete="email" className=" block w-full rounded-md border-0 my-2 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-700 sm:text-sm sm:leading-6" />
          <div className="flex items-center justify-between mt-3">
            <label htmlFor="password" className="block text-sl font-medium leading-6 text-gray-900 mt-3">
              Password*
            </label>
            <Link href="#" className="text-sm font-semibold text-yellow-900 hover:text-yellow-700">
              Forgot password?
            </Link>
          </div>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 my-2 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-700 sm:text-sm sm:leading-6" />

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

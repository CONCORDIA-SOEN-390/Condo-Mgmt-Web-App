import React from "react";
import LoginForm from "@/components/LoginPageComponents/LoginForm";
import Link from "next/link";

function Login() {
  return (
    <>
      <LoginForm />
      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <Link href="/signup" className="font-semibold leading-6 ml-2 text-indigo-600 hover:text-indigo-500">
          Sign Up
        </Link>
      </p>
    </>
  );
}

export default Login;

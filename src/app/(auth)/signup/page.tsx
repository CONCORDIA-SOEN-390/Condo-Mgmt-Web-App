import React from "react";
import SignupForm from "@/components/SignupPageComponents/SignupForm";
import Link from "next/link";

function SignUp() {
  return (
    <>
      <SignupForm />
      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <Link href="/login" className="font-semibold leading-6 ml-2 text-indigo-600 hover:text-indigo-500">
          Sign In
        </Link>
      </p>
    </>
  );
}

export default SignUp;

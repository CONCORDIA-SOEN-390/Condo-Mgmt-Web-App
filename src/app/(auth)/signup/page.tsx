import React from "react";
import SignupForm from "@/components/SignupPageComponents/SignupForm";
import NavBar from "@/components/GeneralComponents/NavBar";
import Footer from "@/components/GeneralComponents/Footer";
import Link from "next/link";
import "@/app/styling/style.css";

function SignUp() {
  return (
    <div className="container-hero">
      <div>
        <NavBar/>
        <div className="bg-sky-50/[0.75] my-36 py-10 rounded-lg mx-auto max-w-2xl">
        <SignupForm />
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?
          <Link href="/login" className="ml-2 font-semibold leading-6 text-yellow-800 hover:text-yellow-600">
            Sign In
          </Link>
        </p>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default SignUp;

import React from "react";
import Link from "next/link";
import NavBar from "@/components/GeneralComponents/NavBar";
import LoginForm from "@/components/LoginPageComponents/LoginForm";
import Footer from "@/components/GeneralComponents/Footer";
import "@/app/styling/style.css";

function Login() {
  return (
    <div className="container-blurry">
      <div>
        <NavBar/>
        <div className="bg-sky-50/[0.75] my-36 py-10 rounded-lg mx-auto max-w-2xl">
          <LoginForm />
          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member? 
            <Link href="/signup" className="ml-2 font-semibold leading-6 text-yellow-800 hover:text-yellow-600">
              Sign Up
            </Link>
          </p>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default Login;
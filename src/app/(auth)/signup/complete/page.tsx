import Image from "next/image";
import React from "react";
import ProfileCompletionForm from "@/components/CompleteProfileComponents/ProfileCompletionForm";
import NavBar from "@/components/GeneralComponents/NavBar";
import Footer from "@/components/GeneralComponents/Footer";
import "@/app/styling/style.css";

function completeSignup() {
  return (
    <div className="container-blurry">
      <div>
        <NavBar/>
        <div className="bg-sky-50/[0.75] my-36 py-10 rounded-lg mx-auto max-w-xl">
          <ProfileCompletionForm/>
        </div>
        <Footer/>
        </div>
    </div>
  );
}

export default completeSignup;

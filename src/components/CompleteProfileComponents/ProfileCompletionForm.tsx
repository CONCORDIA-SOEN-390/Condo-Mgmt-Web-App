"use client";

import Image from "next/image";
import { useFormState } from "react-dom";
import { CompleteProfileVerification } from "@/actions/SignupCompleteAction";
import { useState } from "react";
import { UploadButton } from "@/../utils/uploadthing";

function ProfileCompletionForm() {
  const [state, onSubmit] = useFormState(CompleteProfileVerification, null); //null is the initial state

  return (
    <form action={onSubmit} className="flex flex-col items-center ">
      <div className="w-5/12  rounded-2xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-950">Set Up Profile</h2>
        <div className="mt-8 mb-5">
          <div className="relative">
            <input name="username" placeholder="Username" className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 " />
            <label className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Full Name
            </label>
          </div>
          <div className="flex items-center mt-6">
            <p className="inline text-sm text-gray-700">Import from google</p>
            <input type="checkbox" className="ml-3 checkbox checkbox-xs border-slate-500" />
          </div>
        </div>

        <div className="relative mb-6">
          <input name="phoneNumber" placeholder="Phone Number (nnn-nnn-nnnn)" className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 " />
          <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Phone Number (nnn-nnn-nnnn)
          </label>
        </div>

        <div className="mb-6 text-gray-700">
          <p className="font-semibold mb-3">User Type*:</p>
          <div className="flex items-center mb-2">
            <label htmlFor="individual" className="mr-2 text-sm">
              Individual
            </label>
            <input required type="radio" id="individual" value="individual" name="userType" className="radio radio-xs" />
          </div>
          <div className="flex items-center mb-6">
            <label htmlFor="company" className="mr-2 text-sm">
              Company
            </label>
            <input required type="radio" id="company" value="company" name="userType" className="radio radio-xs" />
          </div>
        </div>

        <div className="relative mb-10">
          <UploadButton
            appearance={{
              button({ ready, isUploading }) {
                return {
                  fontSize: "1rem",
                  color: "black",
                  ...(ready && { color: "#ecfdf5" }),
                  ...(isUploading && { color: "#d1d5db" }),
                };
              },
              container: {
                marginTop: "1rem",
              },
              allowedContent: {
                color: "#a1a1aa",
              },
            }}
            content={{
              button({ ready }) {
                if (ready) return <div>Profile Picture</div>;
                return "Loading...";
              },
              allowedContent({ ready, fileTypes, isUploading }) {
                if (!ready) return "Checking what you allow";
                if (isUploading) return "Seems like stuff is uploading";
                return `Max 4MB: ${fileTypes.join(", ")}`;
              },
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          <div className="flex items-center mt-4">
            <p className="inline text-sm text-gray-700">Import from google</p>
            <input type="checkbox" className="ml-3 checkbox checkbox-xs border-slate-500" />
          </div>
        </div>
        <button type="submit" className="mb-8 bg-yellow-950 hover:bg-yellow-900 text-white py-2 px-16 rounded m-auto block shadow-sm">
          Submit
        </button>
      </div>
    </form>
  );
}

export default ProfileCompletionForm;

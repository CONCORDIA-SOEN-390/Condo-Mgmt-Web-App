"use client";

import Image from "next/image";
import { useFormState } from "react-dom";
import { CompleteProfileVerification } from "@/actions/SignupCompleteAction";
import { useState } from "react";

function ProfileCompletionForm() {
  const [state, onSubmit] = useFormState(CompleteProfileVerification, null); //null is the initial state
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));
    }
  };
  return (
    <form action={onSubmit} className="flex flex-col items-center ">
      <div className="w-5/12  rounded-2xl p-6 ">
        <h2 className="text-3xl font-semibold text-center mb-6 ">Set Up Profile</h2>
        <div className="mb-6 ">
          <div className="relative">
            <input name="username" placeholder="Username" className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 " />
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Username
            </label>
          </div>
          <div className="flex items-center mt-2">
            <p className="inline text-sm text-gray-500">import from google</p>
            <input type="checkbox" className="ml-3 checkbox checkbox-xs border-slate-500" />
          </div>
        </div>

        <div className="relative  mb-6">
          <input name="phoneNumber" placeholder="Phone Number (nnn-nnn-nnnn)" className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 " />
          <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Phone Number (nnn-nnn-nnnn)
          </label>
        </div>

        <div className=" mb-6">
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

        <div className="relative mb-6 ">
          <div className="relative -ml-1">
            <label title="Click to upload" htmlFor="button2" className=" cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group dark:before:bg-darker dark:hover:before:border-gray-500 before:bg-gray-100 dark:before:border-gray-600 before:absolute before:inset-0 before:rounded-xl before:border before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
              <div className="w-max relative">
                <Image src={fileUrl} alt="file upload icon" width={48} /* Adjusted width for consistency */ height={48} /* Adjusted height for consistency */ />
              </div>
              <div className="relative">
                <span className="block text-base font-semibold relative text-blue-900 dark:text-white group-hover:text-blue-500">Upload a profile picture</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600">File type: JPG, PNG, GIF</span>
              </div>
            </label>
            <input required type="file" name="profileUrl" id="button2" hidden onChange={handleFileChange} />
          </div>
          <div className="flex items-center mt-2">
            <p className="inline text-sm text-gray-500">import from google</p>
            <input type="checkbox" className="ml-3 checkbox checkbox-xs border-slate-500" />
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded m-auto block">
          Submit
        </button>
      </div>
    </form>
  );
}

export default ProfileCompletionForm;

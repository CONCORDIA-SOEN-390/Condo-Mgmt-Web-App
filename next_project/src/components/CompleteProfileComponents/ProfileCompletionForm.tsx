"use client";

import Image from "next/image";
import { useFormState } from "react-dom";
import { CompleteProfileVerification } from "@/actions/SignupCompleteAction";
import { useState, useContext } from "react";
import { UploadButton } from "@/../utils/uploadthing";
import { UserContext } from "@/context/userInfoContext";

function ProfileCompletionForm() {
  const [state, onSubmit] = useFormState(CompleteProfileVerification, null); //null is the initial state
  const [username, setUsername] = useState("");
  const [num, setNum] = useState("");
  const [userType, setUserType] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const {email} = useContext(UserContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform form validation if needed

    try {
      const response = await fetch(`/api/signupsteptwo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, // Assuming state.email contains the email value
          username,
          num,
          userType,
          profileUrl,
        }),
      });

      if (response.ok) {
        // Handle success
        console.log('Profile updated successfully');
      } else {
        // Handle error
        console.error('Failed to update profile');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };


  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
  };
  return (

    <form onSubmit={handleSubmit} className="flex flex-col items-center ">
      <div className="w-5/12  rounded-2xl p-6 ">
        <h2 className="text-3xl font-semibold text-center mb-6 ">Set Up Profile</h2>
        <div className="mb-6 ">
          <div className="relative">
            <input name="username" placeholder="Username" onChange={event => setUsername(event.target.value)} className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 " />
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Username
            </label>
          </div>
          <div className="flex items-center mt-6">
            <p className="inline text-sm text-gray-700">Import from google</p>
            <input type="checkbox" className="ml-3 checkbox checkbox-xs border-slate-500" />
          </div>
        </div>


        <div className="relative  mb-6">
          <input name="phoneNumber" placeholder="Phone Number (nnn-nnn-nnnn)" onChange={event => setNum(event.target.value)} className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 " />
          <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">

            Phone Number (nnn-nnn-nnnn)
          </label>
        </div>

        <div className="mb-6 text-gray-700">
          <p className="font-semibold mb-3">User Type*:</p>
          <div className="flex items-center mb-2">
            <label htmlFor="individual" className="mr-2 text-sm">
              Individual
            </label>
            <input required type="radio" id="individual" value="reg_user" onChange={handleUserTypeChange} checked={userType === "reg_user"} name="userType" className="radio radio-xs" />
          </div>
          <div className="flex items-center mb-6">
            <label htmlFor="company" className="mr-2 text-sm">
              Company
            </label>
            <input required type="radio" id="company" value="company" name="userType" checked={userType === "company"} onChange={handleUserTypeChange} className="radio radio-xs" />
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
              console.log(res[0]['url']);
              setProfileUrl(res[0]['url']);
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
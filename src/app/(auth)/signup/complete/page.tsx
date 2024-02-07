import Image from "next/image";
import React from "react";

function completeSignup() {
  return (
    <form className="flex flex-col items-center ">
      <div className="w-5/12  rounded-2xl p-6 ">
        <h2 className="text-3xl font-semibold text-center mb-6 ">Set Up Profile</h2>
        <div className="relative mb-6 ">
          <input id="Username" type="text" className="w-full peer pt-2 pb-1 block text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500" />
          <label htmlFor="Username" className="absolute left-0 top-2 text-gray-400 text-base transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400">
            Username*
          </label>
          <div className="flex items-center mt-2">
            <p className="inline text-sm text-gray-500">import from google</p>
            <input type="checkbox" className="ml-3 checkbox checkbox-xs border-slate-500" />
          </div>
        </div>

        <div className="relative  mb-6">
          <input id="Phone" type="text" className="w-full peer pt-2 pb-1 block text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500" />
          <label htmlFor="Phone" className="absolute left-0 top-2 text-gray-400 text-base transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400">
            Phone Number*
          </label>
        </div>

        <div className=" mb-6">
        <p className="font-semibold mb-3">User Type*:</p>
          <div className="flex items-center mb-2">
            <label htmlFor="individual" className="mr-2 text-sm">
              Individual
            </label>
            <input type="radio" id="individual" name="radio-1" className="radio radio-xs" />
          </div>
          <div className="flex items-center mb-6">
            <label htmlFor="company" className="mr-2 text-sm">
              Company
            </label>
            <input type="radio" id="company" name="radio-1" className="radio radio-xs" />
          </div>
        </div>

        <div className="relative mb-6 ">
          <div className="relative -ml-1">
            <label title="Click to upload" htmlFor="button2" className=" cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group dark:before:bg-darker dark:hover:before:border-gray-500 before:bg-gray-100 dark:before:border-gray-600 before:absolute before:inset-0 before:rounded-xl before:border before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
              <div className="w-max relative">
                <Image src="https://www.svgrepo.com/show/485545/upload-cicle.svg" alt="file upload icon" width={48} /* Adjusted width for consistency */ height={48} /* Adjusted height for consistency */ />
              </div>
              <div className="relative">
                <span className="block text-base font-semibold relative text-blue-900 dark:text-white group-hover:text-blue-500">Upload a profile picture</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600">File type: JPG, PNG, GIF</span>
              </div>
            </label>
            <input type="file" name="button2" id="button2" hidden />
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

export default completeSignup;

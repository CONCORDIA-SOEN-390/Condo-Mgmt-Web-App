import React from 'react'
import {UserBio} from '@/components/ProfilePageComponents//ProfileInfo'

function page() {
  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      <div className="absolute left-0 bg-sky-300 min-h-screen w-48 rounded-r-lg">
        <div className="flex flex-wrap justify-center">
          <div className=" mt-5 w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-4xl font-bold">J</span>
          </div>
          <div className="text-center mt-2 text-white text-xl font-semibold">
            John Smith
            <MdDashboard className="ml-10 mt-20 text-blue-600 text-3xl" />
            <span className="text-blue-600">Dashboard</span>
            <Link href={"finances"}>
              <FaChartColumn className="ml-10 mt-2 text-white text-3xl" />
              Finances
            </Link>
            <Link href={"properties"}>
              <FaBuilding className="ml-10 mt-2 text-white text-3xl" />
              Properties
            </Link>
            <IoSettingsSharp className="ml-10 mt-16 text-white text-3xl" />
            Settings
            <IoIosHelpCircle className="ml-10 mt-2 text-white text-3xl" />
            Contact Us
            <FiLogOut className="ml-10 mt-2 text-white text-3xl" />
            Log Out
          </div>
        </div>
      </div>
      <div className="absolute grid grid-rows-3 w-5/6 right-5 gap-5">
        <div className="bg-white shadow-lg rounded-xl ">
          <div className="grid grid-cols-2 bg-sky-300 rounded-t-lg">
            <div className="p-2 font-semibold text-white text-2xl">
              Personal Information
            </div>
            <div className="p-2 flex justify-end items-center">
              <MdEditSquare className="text-white text-3xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-3 gap-5 p-5 text-black text-xl">
            <div>Name:</div>
            <div className="flex justify-end items-center">John Smith</div>
            <div className="row-start-2">Email:</div>
            <div className="row-start-2 flex justify-end items-center">
              john_smith@gmail.com
            </div>
            <div className="row-start-3">Phone Number:</div>
            <div className="row-start-3 flex justify-end items-center">
              (514) 123-4567
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl ">
          <div className="bg-sky-300 rounded-t-lg p-2 font-semibold text-white text-2xl">
            Finances
          </div>
          <div className="p-16 text-black text-xl text-center">
            SOME INFO ON THE FINANCES
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl ">
          <div className="bg-sky-300 rounded-t-lg p-2 font-semibold text-white text-2xl">
            Properties
          </div>
          <div className="grid grid-cols-2 p-5 text-black text-xl">
            <div>Condo 1</div>
            <div className="flex justify-end items-center">
              Some info on Condo 1
            </div><UploadForm/> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

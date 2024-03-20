import React from "react";
import { MdCreditCard, MdUploadFile } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import UploadForm from "@/components/ProfilePageComponents/UploadForm";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";

function page() {
  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      <SideBar page="profile" />
      <div className="absolute grid grid-rows-3 w-5/6 right-5 gap-5">
        <div className="bg-white shadow-lg rounded-xl ">
          <CardHeader title="Personal Information">
            <MdEditSquare className="text-white text-3xl" />
          </CardHeader>
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
          <CardHeader title="Calendar">
            <MdCreditCard className="text-white text-3xl" />
          </CardHeader>
          <div className="p-16 text-black text-xl text-center">
            SOME INFO ON THE FINANCES
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl ">
          <CardHeader title="Properties">
            <MdUploadFile className="text-white text-3xl" />
          </CardHeader>
          <div className="grid grid-cols-2 p-5 text-black text-xl">
            <div>Condo 1</div>
            <div className="flex justify-end items-center">
              Some info on Condo 1
            </div>
            <UploadForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

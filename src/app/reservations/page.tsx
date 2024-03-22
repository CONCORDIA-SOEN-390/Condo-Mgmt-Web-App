import React from "react";
import { MdCreditCard, MdUploadFile } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import UploadForm from "@/components/ProfilePageComponents/UploadForm";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";

function page() {
  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      <SideBar page="reservations" />
      <div className="absolute grid grid-rows-3 w-5/6 right-5 gap-5">
        <div className="bg-white shadow-lg rounded-xl ">
          <CardHeader title="My Reservations">
            <MdEditSquare className="text-white text-3xl" />
          </CardHeader>
          <div className="grid grid-cols-2 grid-rows-3 gap-5 p-5 text-black text-xl">
  
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl ">
          <CardHeader title="Reserve a Facility">
            <MdCreditCard className="text-white text-3xl" />
          </CardHeader>
      
        </div>
        <div className="bg-white shadow-lg rounded-xl ">
          <CardHeader title="Available Facilities">
            <MdUploadFile className="text-white text-3xl" />
          </CardHeader>
          <div className="grid grid-cols-2 p-5 text-black text-xl">
       
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

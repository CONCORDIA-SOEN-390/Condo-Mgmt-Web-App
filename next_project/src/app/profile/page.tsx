"use client";
import React, { useState } from "react";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import { UserContext } from "@/context/userInfoContext";
import { useContext } from "react";
import Image from "next/image";
import RegisterForm from "@/components/ProfilePageComponents/RegistrationForm";

function ProfilePage() {
  const {profileUrl, email, phoneNumber, userName} = useContext(UserContext);
  const userId = 20;
  return (
      <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
        <SideBar page="profile" />
        <div className="relative grid grid-rows-4 grid-cols-1 gap-4 p-5 text-black text-xl justify-center items-center">
          <div className="row-start-2 row-end-2 col-start-1 col-end-2 flex items-center justify-center">
            <div className="w-40 h-40">
              <Image
                  src={profileUrl}
                  alt="Profile Picture"
                  className="w-full h-full object-cover full"
              />
            </div>
          </div>
          <div className="row-start-3 mrow-end-4 col-start-1 col-end-2">
            <div className="col-start-2 col-end-3 p-2">
              <strong>Name: </strong> {userName}
            </div>
            <div className="col-start-2 col-end-3 p-2">
              <strong>Email: </strong> {email}
            </div>
            <div className="col-start-2 col-end-3 p-2">
              <strong>Phone Number:</strong> {phoneNumber}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <RegisterForm userId={userId} />
        </div>
      </div>

  );
}

export default ProfilePage;

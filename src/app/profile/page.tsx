"use client";
import React from "react";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";

function Page() {
  const [name, setName] = React.useState("John Smith");
  const [email, setEmail] = React.useState("john_smith@gmail.com");
  const [phoneNumber, setPhoneNumber] = React.useState("(514) 123-4567");

  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      <SideBar page="profile" />
      <div className="absolute grid grid-rows-4 grid-cols-1 gap-4 p-5 text-black text-xl justify-center items-center">
        <div className="row-start-2 row-end-2 col-start-1 col-end-2 flex items-center justify-center">
          <div className="w-40 h-40">
            <img
              src={"/TemporaryProfilepicture.png"}
              alt="Profile Picture"
              className="w-full h-full object-cover full"
            />
          </div>
        </div>
        <div className="row-start-3 mrow-end-4 col-start-1 col-end-2">
          <div className="col-start-2 col-end-3 p-2">
            <strong>Name: </strong> {name}
          </div>
          <div className="col-start-2 col-end-3 p-2">
            <strong>Email: </strong> {email}
          </div>
          <div className="col-start-2 col-end-3 p-2">
            <strong>Phone Number:</strong> {phoneNumber}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

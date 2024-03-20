"use client";
import React, { useState } from "react";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";

function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Smith");
  const [email, setEmail] = useState("john_smith@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("(514) 123-4567");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      <SideBar page="profile" />
      <div className="absolute grid grid-rows-4 grid-cols-1 gap-4 p-5 text-black text-xl justify-center items-center">
        <div className="row-start-2 row-end-2 col-start-1 col-end-2 flex items-center justify-center">
          <div className="w-40 h-40  ">
            <img
              //Remove TemporaryProfilepicture.png from public folder
              src={"/TemporaryProfilepicture.png"}
              alt="Profile Picture"
              className="w-full h-full object-cover full"
            />
          </div>
        </div>
        <div className="row-start-3 mrow-end-4 col-start-1 col-end-2">
          <div className="col-start-2 col-end-3 p-2">
            <strong>Name: </strong>{" "}
            {!isEditing ? (
              name
            ) : (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border border-gray-300 p-2 rounded"
              />
            )}
          </div>
          <div className="col-start-2 col-end-3 p-2">
            <strong>Email: </strong>{" "}
            {!isEditing ? (
              email
            ) : (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-gray-300 p-2 rounded"
              />
            )}
          </div>
          <div className="col-start-2 col-end-3 p-2">
            <strong>Phone Number:</strong>{" "}
            {!isEditing ? (
              phoneNumber
            ) : (
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-white border border-gray-300 p-2 rounded"
              />
            )}
          </div>
          <div className="col-start-2 col-end-3 p-2">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-1.5 px-4 rounded text-base"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => {
                  handleSave();
                  setName(name);
                  setEmail(email);
                  setPhoneNumber(phoneNumber);
                }}
                className="bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-1.5 px-4 rounded text-base"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

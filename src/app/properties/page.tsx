"use client";
import React, { useState } from "react";
import { UserBio } from "@/components/ProfilePageComponents//ProfileInfo";
//import AddPropertyForm from "@/components/PropertiesPageComponents/AddPropertyForm";
import AddPropertyForm from "@/components/PropertiesPageComponents/PublicUserView/AddPropertyForm";
import { MdDashboard } from "react-icons/md";
import { FaBuilding } from "react-icons/fa6";
import { FaChartColumn } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdEditSquare } from "react-icons/md";
import { PiPlusSquareFill } from "react-icons/pi";
import { GrDocumentText } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import Link from "next/link";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import PropertyTable from "@/components/PropertiesPageComponents/PropertyTable";

function page() {
  const [showAddPropertyForm, setshowAddPropertyFormStatus] = useState(false);

  const toggleForm = () => {
    setshowAddPropertyFormStatus(!showAddPropertyForm);
  };

  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      <SideBar page='properties'/>
      <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl">
        <CardHeader title="Properties">
          <button onClick={toggleForm}><PiPlusSquareFill/></button>
        </CardHeader>

        {showAddPropertyForm && <AddPropertyForm />}
        <PropertyTable></PropertyTable>
      </div>
    </div>
  );
}

export default page;

"use client";
import React, { useState } from "react";
import AddPropertyForm from "@/components/PropertiesPageComponents/CompanyView/AddPropertyForm";
//import AddPropertyForm from "@/components/PropertiesPageComponents/PublicUserView/AddPropertyForm";
import { PiPlusSquareFill } from "react-icons/pi";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import PropertyTable from "@/components/PropertiesPageComponents/PublicUserView/PropertyTable";

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

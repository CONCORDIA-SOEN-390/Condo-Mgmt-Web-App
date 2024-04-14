"use client";
import { useState,useEffect } from "react";
import AddPropertyForm from "@/components/PropertiesPageComponents/CompanyView/AddPropertyForm";
//import AddPropertyForm from "@/components/PropertiesPageComponents/PublicUserView/AddPropertyForm";
import { PiPlusSquareFill } from "react-icons/pi";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import PublicUserPropertyTable from "@/components/PropertiesPageComponents/PublicUserView/PropertyTable";
import CompanyPropertyTable from "@/components/PropertiesPageComponents/CompanyView/CompanyPropertyTable";



function PropertiesPage() {

  // RENDERING SHOULD BE FIXED HERE DO NO TOUCH THE COMPONENT CONTENT
  const page = 'company'; // company or anything for user
  const [showAddPropertyForm, setshowAddPropertyFormStatus] = useState(false);

  // hardcoded
  //const userId = 3 // reg_user
  const userId = 1 // company user

  const toggleForm = () => {
    setshowAddPropertyFormStatus(!showAddPropertyForm);
  };

  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      {page === 'company'? <CompanySideBar page='properties'/> : <PublicUserSideBar page='properties'/>}
      <div className="absolute max-w-screen-sm w-1/2 sm:w-2/3 max-w-screen-md md:w-3/5 max-w-screen-lg lg:w-4/6 max-w-screen-xl xl:w-5/6 top-5 bottom-5 bg-white shadow-lg rounded-xl ml-40">
        <CardHeader title="Properties">
          <button onClick={toggleForm}><PiPlusSquareFill/></button>
        </CardHeader>

        {showAddPropertyForm && <AddPropertyForm userId={userId} />}
        {page === 'company'? <CompanyPropertyTable userId={userId} />: <PublicUserPropertyTable/>}
      </div>
    </div>
  );
}

export default PropertiesPage;

"use client"
import React, { useState } from "react";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanyViewPage from "@/components/FinancePageComponents/CompanyView/CompanyViewPage";
import PublicUserPropertyTable from "@/components/PropertiesPageComponents/PublicUserView/PropertyTable";

function FinancesPage() {
    // page in progress
    //------------------------------------FIX PAGE RENDERING HERE -------------------------------------------------------
  const page = 'company';
  //const userId = 3 // reg_user
  const userId = 1; // company user

    //-------------------------------------------------------------------------------------------------------------------
  return (
      <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
          {page === 'company'? <CompanySideBar page='properties'/> : <PublicUserSideBar page='properties'/>}
          <div className="absolute max-w-screen-sm w-1/2 sm:w-2/3 max-w-screen-md md:w-3/5 max-w-screen-lg lg:w-4/6 max-w-screen-xl xl:w-5/6 top-5 bottom-5 bg-white shadow-lg rounded-xl ml-40">
              {page === 'company'? <CompanyViewPage userId={userId} />: <PublicUserPropertyTable/>}
          </div>
      </div>
  );
}

export default FinancesPage;

"use client"
import React, { useState } from "react";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanyViewPage from "@/components/FinancePageComponents/CompanyView/CompanyViewPage";
import PublicUserPropertyTable from "@/components/PropertiesPageComponents/PublicUserView/PropertyTable";
import CondoOwnerViewPage from "@/components/FinancePageComponents/PublicUserView/CondoOwnerViewPage";

function FinancesPage() {
    // page in progress
    //------------------------------------FIX PAGE RENDERING HERE -------------------------------------------------------
  const page = 'company';

  const userId = 1 // company user      {/*: <CompanyViewPage userId={userId}
  //const userId = 19; // reg_user         {<CondoOwnerViewPage userId={userId}/> }

    //-------------------------------------------------------------------------------------------------------------------
  return (
      <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
          {page === 'company'? <CompanySideBar page='properties'/> : <PublicUserSideBar page='properties'/>}
          <div className="absolute w-5/6 inset-y-0 right-5 bg-white shadow-lg rounded-xl">
             {/*{<CondoOwnerViewPage userId={userId}/> }:*/} <CompanyViewPage userId={userId} />
          </div>
      </div>
  );
}
export default FinancesPage;

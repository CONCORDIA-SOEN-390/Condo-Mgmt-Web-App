"use client"
import React, { useState } from "react";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanyViewPage from "@/components/FinancePageComponents/CompanyView/CompanyViewPage";
import CondoOwnerViewPage from "@/components/FinancePageComponents/PublicUserView/CondoOwnerViewPage";
import {useSession} from "next-auth/react";

function FinancesPage() {
    const { data: session } = useSession();
    // @ts-ignore comment
    const userId = session?.user?.user_id;
    // @ts-ignore comment
    const page = session?.user?.account_type;

  return (
      <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
          {page === 'company' ? <CompanySideBar page='properties'/> : <PublicUserSideBar page='properties'/>}
          <div className="absolute w-5/6 inset-y-0 right-5 bg-white shadow-lg rounded-xl">
              {page === 'company'
                  ? <CompanyViewPage userId={userId} />
                  : <CondoOwnerViewPage userId={userId} />
              }
          </div>
      </div>
  );
}
export default FinancesPage;

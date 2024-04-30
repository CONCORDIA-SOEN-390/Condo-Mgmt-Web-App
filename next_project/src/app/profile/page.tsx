"use client"
import React, { useState } from "react";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import {useSession} from "next-auth/react";
import RegisterForm from "@/components/ProfilePageComponents/RegistrationForm";
import {auth} from "@/lib/auth";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";

import Dashboard from "@/components/ProfilePageComponents/Dashboard";

function ProfilePage() {
    const { data: session } = useSession();
    // @ts-ignore comment
    const userId = session?.user?.user_id;
    // @ts-ignore comment
    const page = session?.user?.account_type;

  return (
      <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
          {page === 'company' ? <CompanySideBar page='profile'/> : <PublicUserSideBar page='properties'/>}
          <div className="absolute w-5/6 inset-y-0 right-5 bg-white shadow-lg rounded-xl">
              <CardHeader title="Profile">
                  .
              </CardHeader>
              <Dashboard userId={userId} />
          </div>
      </div>
  );
}

export default ProfilePage;

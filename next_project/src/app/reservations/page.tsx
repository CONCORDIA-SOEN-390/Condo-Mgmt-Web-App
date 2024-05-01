"use client"
import React, { useState } from "react";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanyViewPage from "@/components/ReservationPageComponents/CompanyView/CompanyViewPage";
import { useSession } from "next-auth/react";
import CondoOwnerViewPage from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/CondoOwnerAndRentalPage";
import CardHeader from "@/components/GeneralComponents/CardHeader";

function ReservationsPage() {
    const { data: session } = useSession();
    // @ts-ignore comment
    const userId = session?.user?.user_id;
    // @ts-ignore comment
    const page = session?.user?.account_type;

    return (

        <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
            <CompanySideBar page='reservations'/>
            <div className="absolute max-w-screen-sm w-1/2 sm:w-2/3 max-w-screen-md md:w-3/5 max-w-screen-lg lg:w-4/6 max-w-screen-xl xl:w-5/6 top-5 bottom-5 bg-white shadow-lg rounded-xl ml-60 mr-10">
                <CardHeader title="Reservations">
                    .
                </CardHeader>
                {page === 'company'
                    ? <CompanyViewPage userId={userId} />
                    : <CondoOwnerViewPage userId={userId} />
                }
            </div>
        </div>
    );
}

export default ReservationsPage;

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
            <div className="absolute w-5/6 inset-y-0 right-5 bg-white shadow-lg rounded-xl">
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

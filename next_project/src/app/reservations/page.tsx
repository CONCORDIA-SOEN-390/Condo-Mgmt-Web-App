"use client"
import React, {useContext, useEffect, useState} from "react";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";

import CondoOwnerAndRentalPage from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/CondoOwnerAndRentalPage";
import CompanyViewPage from "@/components/ReservationPageComponents/CompanyView/CompanyViewPage"
import {UserContext} from "@/context/userInfoContext";

function ReservationsPage() {
    // FIX PAGE RENDERING HERE DEPENDING ON THE accountType
    // also fetch user_id since its being passed

    //const {userId, accountType} = useContext(UserContext);

    //--------------------------HARDCODED VALUES--------------------------------------
    const userId = 1;
    const accountType = "company";
    //const userId = 2;
    //const accountType = "reg_user";
    //--------------------------------------------------------------------------------

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-64 bg-gray-200">
                <SideBar page="reservations" />
            </div>
            <div className="flex flex-grow lg:pl-40"> {/* Add lg:pl-64 to push content right on large screens */}
                <div className="flex-grow"></div>
                <div className="flex justify-end lg:justify-center xl:justify-end">
                    {accountType === "reg_user" && (
                        <CondoOwnerAndRentalPage userId={userId} />
                    )}
                    {accountType === "company" && (
                        <CompanyViewPage userId={userId} />
                    )}
                </div>
            </div>
        </div>




    );
}

export default ReservationsPage;

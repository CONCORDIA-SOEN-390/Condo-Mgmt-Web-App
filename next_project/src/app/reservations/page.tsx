"use client";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";

import CondoOwnerAndRentalPage from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/CondoOwnerAndRentalPage";
import CompanyViewPage from "@/components/ReservationPageComponents/CompanyView/CompanyViewPage";
import { UserContext } from "@/context/userInfoContext";
import { useSession } from "next-auth/react";

function ReservationsPage() {
  const { data: session } = useSession();
  // @ts-ignore comment
  const { user_id: userId } = session;
  // FIX PAGE RENDERING HERE DEPENDING ON THE accountType
  // also fetch user_id since its being passed

  //--------------------------HARDCODED VALUES--------------------------------------
  //   const userId = 1; // company user    // <CompanyViewPage userId={userId} />
  //   const accountType = "company";
  //const userId = 19; // condo owner <CondoOwnerAndRentalPage userId={userId} />
  //const accountType = "reg_user";
  //--------------------------------------------------------------------------------

  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      <SideBar page="reservations" />

      <div className="absolute w-5/6 inset-y-0 right-5 bg-white shadow-lg rounded-xl">
        {/**/}
        <CompanyViewPage userId={userId} />

        {/*


               {accountType === "reg_user" && (

              )}
<CondoOwnerAndRentalPage userId={userId} />

 {accountType === "company" && (

              )}

                  */}
      </div>
    </div>
  );
}

export default ReservationsPage;

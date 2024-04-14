"use client"
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";

import CondoOwnerAndRentalPage from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/CondoOwnerAndRentalPage";
import CompanyViewPage from "@/components/ReservationPageComponents/CompanyView/CompanyViewPage"
import {UserContext} from "@/context/userInfoContext";

function ReservationsPage() {
  // FIX PAGE RENDERING HERE DEPENDING ON THE accountType
  // also fetch user_id since its being passed

  //const {userId, accountType} = useContext(UserContext);

  //--------------------------HARDCODED VALUES--------------------------------------
  const userId = 1; // company user
  const accountType = "company";
  //const userId = 3;
  //const accountType = "reg_user";
  //--------------------------------------------------------------------------------

  return (
      <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
              <SideBar page="reservations" />

          <div className="absolute max-w-screen-sm w-1/2 sm:w-2/3 max-w-screen-md md:w-3/5 max-w-screen-lg lg:w-4/6 max-w-screen-xl xl:w-5/6 top-5 bottom-5 bg-white shadow-lg rounded-xl ml-40">

                  {
                      /**/
                  }
                  {accountType === "company" && (
                      <CompanyViewPage userId={userId} />
                  )}


                  {/*
                 {accountType === "reg_user" && (
                  <CondoOwnerAndRentalPage userId={userId} />
                  )}
                  */}


          </div>
      </div>








  );
}

export default ReservationsPage;
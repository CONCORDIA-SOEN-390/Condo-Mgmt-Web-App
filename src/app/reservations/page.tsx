import React from "react";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import MyReservationTable from "@/components/ReservationPageComponents/MyReservationTable";
import AvailableFacilityTable from "@/components/ReservationPageComponents/AvailableFacilityTable";

function Page() {
  return (
    <div className="flex min-h-screen-nav items-center ml-40 justify-center h-full bg-white">
      <SideBar page="profile" />
      <div className="grid grid-cols-1 gap-5   ">
        <div className="bg-white shadow-lg rounded-xl">
          <CardHeader title="My Reservations" children={undefined}></CardHeader>
          <div className="p-5 text-black text-xl">
            <MyReservationTable />
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl">
          <CardHeader title="Available Facilities" children={undefined}></CardHeader>
          <div className="p-5 text-black text-xl">
            <AvailableFacilityTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

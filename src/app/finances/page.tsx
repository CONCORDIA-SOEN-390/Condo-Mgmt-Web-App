"use client";
import { MdEditSquare } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import FinanceTable from "@/components/FinancePageComponents/PublicUserView/FinanceTable";

function page() {
  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      <SideBar page='finances'/>
      <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl">
        <CardHeader title="Finances">
          <MdEditSquare className="" />
          <MdCancel className="" />
        </CardHeader>
        <FinanceTable/>
      </div>
    </div>
  );
}

export default page;

"use client";
import { MdEditSquare } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import PublicUserFinanceTable from "@/components/FinancePageComponents/PublicUserView/FinanceTable";
import CompanyFinanceTable from "@/components/FinancePageComponents/CompanyView/FinanceTable";
import {PiPlusSquareFill} from "react-icons/pi";
import React, {useState} from "react";
import AddFinanceForm from "@/components/FinancePageComponents/CompanyView/AddFinanceForm";
import EditFinanceForm from "@/components/FinancePageComponents/CompanyView/EditFinanceForm";

function page() {
  const page = 'company';


    const [showAddFinanceForm, setshowAddFinanceFormFormStatus] = useState(false);

    const toggleFormAdd = () => {
      setshowAddFinanceFormFormStatus(!showAddFinanceForm);
    };

  const [showEditFinanceForm, setshowEditFinanceFormFormStatus] = useState(false);

  const toggleFormEdit = () => {
    setshowEditFinanceFormFormStatus(!showEditFinanceForm);
  };



    return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      {page === 'company'? <CompanySideBar page='finances'/>:<PublicUserSideBar page='finances'/>}
      
      <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl">
        <CardHeader title="Finances">
            <button onClick={toggleFormAdd}><PiPlusSquareFill/></button>
          <button onClick={toggleFormEdit}><MdEditSquare/></button>
          <MdCancel className="" />
        </CardHeader>

        {showAddFinanceForm && <AddFinanceForm />}
        {showEditFinanceForm && <EditFinanceForm />}
        {page === 'company'? <CompanyFinanceTable/>:<PublicUserFinanceTable/>}
        
      </div>
    </div>
  );
}

export default page;

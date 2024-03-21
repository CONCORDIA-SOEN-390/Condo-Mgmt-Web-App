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
import RequestForm from "@/components/RequestPageComponents/CompanyView/RequestForm";
import RequestTable from "@/components/RequestPageComponents/CompanyView/RequestTable";

function page() {
    const page = 'company';


    const [showAddRequestForm, setshowAddRequestFormFormStatus] = useState(false);

    const toggleFormAdd = () => {
        setshowAddRequestFormFormStatus(!showAddRequestForm);
    };



    return (
        <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
            {page === 'company'? <CompanySideBar page='requests'/>:<PublicUserSideBar page='requests'/>}

            <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl">
                <CardHeader title="Requests">
                    <button onClick={toggleFormAdd}><PiPlusSquareFill/></button>

                    <MdCancel className="" />
                </CardHeader>


                {showAddRequestForm && <RequestForm />}
                {page === 'company'? <RequestTable/>:<RequestTable/>}

            </div>
        </div>
    );
}

export default page;

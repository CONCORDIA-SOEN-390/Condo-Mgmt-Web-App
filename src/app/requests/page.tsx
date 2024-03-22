"use client";
import { MdEditSquare } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import {PiPlusSquareFill} from "react-icons/pi";
import React, {useState} from "react";
import RequestForm from "@/components/RequestPageComponents/CompanyView/RequestForm";
import RequestTable from "@/components/RequestPageComponents/CompanyView/RequestTable";
import EditRequestForm from "@/components/RequestPageComponents/CompanyView/EditRequestForm";

function page() {
    const page = 'company';


    const [showAddRequestForm, setshowAddRequestFormFormStatus] = useState(false);

    const toggleFormAdd = () => {
        setshowAddRequestFormFormStatus(!showAddRequestForm);
    };

    const [showEditRequestForm, setshowEditRequestFormFormStatus] = useState(false);

    const toggleFormEdit = () => {
        setshowEditRequestFormFormStatus(!showEditRequestForm);
    };



    return (
        <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
            {page === 'company'? <CompanySideBar page='requests'/>:<PublicUserSideBar page='requests'/>}

            <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl">
                <CardHeader title="Requests">
                    <button onClick={toggleFormAdd}><PiPlusSquareFill/></button>
                    <button onClick={toggleFormEdit}><MdEditSquare/></button>
                    <MdCancel className="" />


                </CardHeader>


                {showAddRequestForm && <RequestForm />}
                {showEditRequestForm && <EditRequestForm />}
                {page === 'company'? <RequestTable/>:<RequestTable/>}

            </div>
        </div>
    );
}

export default page;

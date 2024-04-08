"use client";
import { MdEditSquare } from "react-icons/md";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import {PiPlusSquareFill} from "react-icons/pi";
import React, {useState} from "react";
import AddRequestForm from "@/components/RequestPageComponents/CompanyView/AddRequestForm";
import CompanyRequestTable from "@/components/RequestPageComponents/CompanyView/RequestTable";
import EditRequestForm from "@/components/RequestPageComponents/CompanyView/EditRequestForm";
import PublicUserRequestTable from "@/components/RequestPageComponents/PublicUserView/RequestTable"
import Request from "@/components/RequestPageComponents/PublicUserView/Request"


// i don't understand the company and public user rendering. For now, they both see the same content
function RequestsPage() {
    const page = 'company';

    const userId = 1;
    // toggle for add and edit
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


                </CardHeader>
                {showAddRequestForm && <AddRequestForm />}
                {showEditRequestForm && <EditRequestForm />}
                {/*fix rendering here*/}
                {/*page === 'company'? <CompanyRequestTable/>:<PublicUserRequestTable/>*/}
                <Request userId={userId} />

            </div>
        </div>
    );
}
export default RequestsPage;

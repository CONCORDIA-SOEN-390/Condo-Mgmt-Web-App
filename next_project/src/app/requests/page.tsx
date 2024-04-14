"use client";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import React, {useState} from "react";
import RequestCompanyView from "@/components/RequestPageComponents/CompanyView/Request";
import RequestPublicView from "@/components/RequestPageComponents/PublicUserView/Request"
import RequestEmployeeView from "@/components/RequestPageComponents/EmployeeView/RequestTable"
import {PiPlusSquareFill} from "react-icons/pi";

function RequestsPage() {
    //------------------------------------FIX PAGE RENDERING HERE------------------------------------
    //const {userId, accountType} = useContext(UserContext);
    const page = 'company';
    // harcoded userId
    //const userId = 13; // employee user   <RequestEmployeeView userId={userId}/>
    const userId = 1;   // company user  <RequestCompanyView userId={userId}/>
    //const userId = 19;   // condo owner  <RequestPublicView userId={userId} />

    //-----------------------------------------------------------------------------------------------


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
            {/*fix rendering here**/}
            {page === 'company'? <CompanySideBar page='requests'/>:<PublicUserSideBar page='requests'/>}
            <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl">
                <CardHeader title="Assigned Requests">
                    .
                </CardHeader>

                {/*fix rendering here
                there are three different types of pages
                */}

                {/*
<RequestPublicView userId={userId} />

<RequestEmployeeView userId={userId}/>

                */}

                <RequestCompanyView userId={userId}/>

            </div>
        </div>
    );
}
export default RequestsPage;
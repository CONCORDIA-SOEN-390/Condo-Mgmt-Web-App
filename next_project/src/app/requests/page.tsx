"use client";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import React, {useState} from "react";
import RequestCompanyView from "@/components/RequestPageComponents/CompanyView/Request";
import RequestPublicView from "@/components/RequestPageComponents/PublicUserView/Request"
import RequestEmployeeView from "@/components/RequestPageComponents/EmployeeView/RequestTable"

function RequestsPage() {
    //------------------------------------FIX PAGE RENDERING HERE------------------------------------
    //const {userId, accountType} = useContext(UserContext);
    const page = 'company';
    // harcoded userId
    const userId = 13; // company user

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

                {/*fix rendering here
                there are three different types of pages
                */}

                {/*page === 'company'? <CompanyRequestTable/>:<PublicUserRequestTable/>
 <RequestPublicView userId={userId} />


 <RequestCompanyView userId={userId}/>
                */}
                <RequestEmployeeView userId={userId}/>


            </div>
        </div>
    );
}
export default RequestsPage;
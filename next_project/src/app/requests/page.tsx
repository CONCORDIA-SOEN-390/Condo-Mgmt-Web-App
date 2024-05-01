"use client";
import React from "react";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import RequestCompanyView from "@/components/RequestPageComponents/CompanyView/Request";
import RequestPublicView from "@/components/RequestPageComponents/PublicUserView/Request";
import RequestEmployeeView from "@/components/RequestPageComponents/EmployeeView/RequestTable";
import { useSession } from "next-auth/react";

function RequestsPage() {
    const { data: session } = useSession();
    // @ts-ignore comment
    const userId = session?.user?.user_id;
    // @ts-ignore comment
    const page = session?.user?.account_type;
    // @ts-ignore comment

    return (
        <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
            <CompanySideBar page='requests'/>
            <div className="absolute max-w-screen-sm w-1/2 sm:w-2/3 max-w-screen-md md:w-3/5 max-w-screen-lg lg:w-4/6 max-w-screen-xl xl:w-5/6 top-5 bottom-5 bg-white shadow-lg rounded-xl ml-60 mr-10">
                <CardHeader title="Requests">
                    .
                </CardHeader>
                {page === 'company' && <RequestCompanyView userId={userId} />}
                {page === 'reg_user' && <RequestPublicView userId={userId} />}
                {page !== 'company' && page !== 'reg_user' && <RequestEmployeeView userId={userId} />}
            </div>
        </div>
    );
}

export default RequestsPage;

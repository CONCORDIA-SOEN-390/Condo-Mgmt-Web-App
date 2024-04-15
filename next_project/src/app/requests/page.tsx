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
            {page === 'company' ? <CompanySideBar page={page}/> : <PublicUserSideBar page={page}/>}
            <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl">
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

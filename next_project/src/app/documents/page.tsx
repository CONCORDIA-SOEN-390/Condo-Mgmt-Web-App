"use client"
import PublicUserDocumentTable from "@/components/DocumentPageComponents/PublicUserView/DocumentTable";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import DocumentCompanyView from "@/components/DocumentPageComponents/CompanyView/DocumentCompanyView";
import {useSession} from "next-auth/react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import DocumentCondoOwnerView from "@/components/DocumentPageComponents/PublicUserView/DocumentCondoOwnerView";
import React from "react";


// this page is in progress
export default function DocumentsPage() {
    const { data: session } = useSession();
    // @ts-ignore comment
    const userId = session?.user?.user_id;
    // @ts-ignore comment
    const page = session?.user?.account_type;

    return (
        <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
           <CompanySideBar page='documents'/>
            <div className="absolute max-w-screen-sm w-1/2 sm:w-2/3 max-w-screen-md md:w-3/5 max-w-screen-lg lg:w-4/6 max-w-screen-xl xl:w-5/6 top-5 bottom-5 bg-white shadow-lg rounded-xl ml-60 mr-10">
                <CardHeader title="Documents">
                    .
                </CardHeader>
                {page === 'company'
                    ? <DocumentCompanyView userId={userId} />
                    : <DocumentCondoOwnerView userId={userId} />
                }
            </div>
        </div>

        );
}
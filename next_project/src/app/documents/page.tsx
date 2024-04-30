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
            {page === 'company' ? <CompanySideBar page='documents'/> : <PublicUserSideBar page='properties'/>}
            <div className="absolute w-5/6 inset-y-0 right-5 bg-white shadow-lg rounded-xl">
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
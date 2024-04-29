"use client"
import PublicUserDocumentTable from "@/components/DocumentPageComponents/PublicUserView/DocumentTable";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import DocumentCompanyView from "@/components/DocumentPageComponents/CompanyView/DocumentCompanyView";
import {useSession} from "next-auth/react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
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
            {page === 'company'? <CompanySideBar page='documents'/>:<PublicUserSideBar page='documents'/>}
            <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl">
                <CardHeader title="Documents">
                    .
                </CardHeader>
            {/*isUploading && ((page === 'company')? <CompanyDocumentUploadForm/> : <PublicUserDocumentUploadForm/>)*/}
            {page === 'company'? <DocumentCompanyView userId={userId}/>:<PublicUserDocumentTable/>}
            </div>
        </div>
        );
}
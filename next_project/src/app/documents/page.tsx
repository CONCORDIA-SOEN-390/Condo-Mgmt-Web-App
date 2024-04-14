"use client"
import PublicUserDocumentTable from "@/components/DocumentPageComponents/PublicUserView/DocumentTable";
import CompanyDocumentTable from "@/components/DocumentPageComponents/CompanyView/DocumentTable";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
//import PublicUserDocumentUploadForm from "@/components/DocumentPageComponents/PublicUserView/DocumentUploadForm";
import CompanyDocumentUploadForm from "@/components/DocumentPageComponents/CompanyView/DocumentUploadForm";
import { useState } from "react";
import { MdCancel, MdEditSquare } from "react-icons/md";
import { PiPlusSquareFill } from "react-icons/pi";
import DocumentCompanyView from "@/components/DocumentPageComponents/CompanyView/DocumentCompanyView";

// this page is in progress
export default function DocumentsPage() {
    // page in progress
    const page = 'company';
    const [ isUploading, setIsUploading ] = useState(false);
    const userId = 1

    const toggleForm = () => {
        setIsUploading(!isUploading);
        };

    return (
        <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
            {page === 'company'? <CompanySideBar page='documents'/>:<PublicUserSideBar page='documents'/>}
            <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl">

            {/*isUploading && ((page === 'company')? <CompanyDocumentUploadForm/> : <PublicUserDocumentUploadForm/>)*/}
            {page === 'company'? <DocumentCompanyView userId={userId}/>:<PublicUserDocumentTable/>}
            </div>
        </div>
        );
}
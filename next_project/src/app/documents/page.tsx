"use client"
import PublicUserDocumentTable from "@/components/DocumentPageComponents/PublicUserView/DocumentTable";
import CompanyDocumentTable from "@/components/DocumentPageComponents/CompanyView/DocumentTable";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import PublicUserDocumentUploadForm from "@/components/DocumentPageComponents/PublicUserView/DocumentUploadForm";
import CompanyDocumentUploadForm from "@/components/DocumentPageComponents/CompanyView/DocumentUploadForm";
import { useState } from "react";
import { MdCancel, MdEditSquare } from "react-icons/md";
import { PiPlusSquareFill } from "react-icons/pi";

export default function DocumentsPage() {
    // page in progress
    const page = 'company';
    const [ isUploading, setIsUploading ] = useState(false);

    const toggleForm = () => {
        setIsUploading(!isUploading);
        };

    return (
        <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
            {page === 'company'? <CompanySideBar page='documents'/>:<PublicUserSideBar page='documents'/>}
            <div className="absolute max-w-screen-sm w-1/2 sm:w-2/3 max-w-screen-md md:w-3/5 max-w-screen-lg lg:w-4/6 max-w-screen-xl xl:w-5/6 top-5 bottom-5 bg-white shadow-lg rounded-xl ml-60 mr-10" >
            <CardHeader title="Documents">
                <button onClick={toggleForm}><PiPlusSquareFill/></button>
                <MdEditSquare className="" />
                <MdCancel className="" />
            </CardHeader>

            {isUploading && ((page === 'company')? <CompanyDocumentUploadForm/> : <PublicUserDocumentUploadForm/>)}
            {page === 'company'? <CompanyDocumentTable/>:<PublicUserDocumentTable/>}
            </div>
        </div>
        );
}
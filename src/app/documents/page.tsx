"use client"
import DocumentTable from "@/components/DocumentPageComponents/PublicUserView/DocumentTable";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import DocumentUploadForm from "@/components/DocumentPageComponents/PublicUserView/DocumentUploadForm";
import { useState } from "react";
import { MdCancel, MdEditSquare } from "react-icons/md";
import { PiPlusSquareFill } from "react-icons/pi";

export default function page() {
    const [ isUploading, setIsUploading ] = useState(false);

    const toggleForm = () => {
        setIsUploading(!isUploading);
        };

    return (
        <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
            <SideBar page='documents'/>
            <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl">
            <CardHeader title="Documents">
                <button onClick={toggleForm}><PiPlusSquareFill/></button>
                <MdEditSquare className="" />
                <MdCancel className="" />
            </CardHeader>

            {isUploading && <DocumentUploadForm />}
            <DocumentTable></DocumentTable>
            </div>
        </div>
        );
}
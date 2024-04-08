"use client"
import { useState, useEffect } from "react";
import AddPropertyForm from "@/components/PropertiesPageComponents/CompanyView/AddPropertyForm";
import { PiPlusSquareFill } from "react-icons/pi";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import PublicUserPropertyTable from "@/components/PropertiesPageComponents/PublicUserView/PropertyTable";
import CompanyPropertyTable from "@/components/PropertiesPageComponents/CompanyView/CompanyPropertyTable";

function PropertiesPage() {
    const page = 'company'; // company or anything for user
    const [showAddPropertyForm, setshowAddPropertyFormStatus] = useState(false);
    const [properties, setProperties] = useState([]);
    const userId = 4;

    const toggleForm = () => {
        setshowAddPropertyFormStatus(!showAddPropertyForm);
    };

    return (
        <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
            {page === 'company'? <CompanySideBar page='properties'/> : <PublicUserSideBar page='properties'/>}
            <div className="absolute w-5/6 inset-y-0 right-5 bg-white shadow-lg rounded-xl">
                <CardHeader title="Properties">
                    <button onClick={toggleForm}><PiPlusSquareFill/></button>
                </CardHeader>

                {showAddPropertyForm && <AddPropertyForm userId={userId} />}
                {page === 'company'? <CompanyPropertyTable properties={properties} userId={userId} />: <PublicUserPropertyTable userId={userId} />} {/* Pass userId to CompanyPropertyTable and PublicUserPropertyTable */}
            </div>
        </div>
    );
}

export default PropertiesPage;

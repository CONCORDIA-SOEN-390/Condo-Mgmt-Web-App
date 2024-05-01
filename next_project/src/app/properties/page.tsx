"use client";
import { useState } from "react";
import AddPropertyForm from "@/components/PropertiesPageComponents/CompanyView/AddPropertyForm";
import { PiPlusSquareFill } from "react-icons/pi";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import CompanyPropertyTable from "@/components/PropertiesPageComponents/CompanyView/CompanyPropertyTable";
import CondoOwnerView from "@/components/PropertiesPageComponents/PublicUserView/PropertyTable";
import { useSession } from "next-auth/react";



function PropertiesPage() {
  const { data: session } = useSession();
  // @ts-ignore comment
  const userId = session?.user?.user_id;
  // @ts-ignore comment
  const page = session?.user?.account_type;


  const [showAddPropertyForm, setshowAddPropertyFormStatus] = useState(false);
  const toggleForm = () => {
    setshowAddPropertyFormStatus(!showAddPropertyForm);
  };

  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      <CompanySideBar page='properties'/>
      <div className="absolute max-w-screen-sm w-1/2 sm:w-2/3 max-w-screen-md md:w-3/5 max-w-screen-lg lg:w-4/6 max-w-screen-xl xl:w-5/6 top-5 bottom-5 bg-white shadow-lg rounded-xl ml-60 mr-10">
        <CardHeader title="Properties">
          {page === 'company' && <button onClick={toggleForm}><PiPlusSquareFill className="text-white"/></button>}
        </CardHeader>
        {showAddPropertyForm && page === 'company' && <AddPropertyForm userId={userId} />}
        {page === 'company'? <CompanyPropertyTable userId={userId} />: <CondoOwnerView userId={userId} />}
      </div>
    </div>
  );
}

export default PropertiesPage;

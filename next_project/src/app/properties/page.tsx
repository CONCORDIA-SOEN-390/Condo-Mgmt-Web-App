"use client";
import { useState } from "react";
import AddPropertyForm from "@/components/PropertiesPageComponents/CompanyView/AddPropertyForm";
//import AddPropertyForm from "@/components/PropertiesPageComponents/PublicUserView/AddPropertyForm";
import { PiPlusSquareFill } from "react-icons/pi";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import PublicUserPropertyTable from "@/components/PropertiesPageComponents/PublicUserView/PropertyTable";
import CompanyPropertyTable from "@/components/PropertiesPageComponents/CompanyView/CompanyPropertyTable";
import CondoOwnerView from "@/components/PropertiesPageComponents/PublicUserView/PropertyTable";
import { useSession } from "next-auth/react";



function PropertiesPage() {

  
  const { data: session } = useSession();
  // @ts-ignore comment
  const userId = session?.user?.user_id;
  // @ts-ignore comment
  const page = session?.user?.account_type;
  console.log(session)


  const [showAddPropertyForm, setshowAddPropertyFormStatus] = useState(false);
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
        {page === 'company'? <CompanyPropertyTable userId={userId} />: <CondoOwnerView userId={userId} />}
      </div>
    </div>
  );
}

export default PropertiesPage;

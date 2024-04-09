"use client";
import { useState,useEffect } from "react";
import AddPropertyForm from "@/components/PropertiesPageComponents/CompanyView/AddPropertyForm";
//import AddPropertyForm from "@/components/PropertiesPageComponents/PublicUserView/AddPropertyForm";
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

  const userId = 1;


  const toggleForm = () => {
    setshowAddPropertyFormStatus(!showAddPropertyForm);
  };

  useEffect(() => {
    fetch("api/getProperties")
      .then(response => response.json())
      .then(data => {
        setProperties(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      {page === 'company'? <CompanySideBar page='properties'/> : <PublicUserSideBar page='properties'/>}
      <div className="absolute w-5/6 inset-y-0 right-5 bg-white shadow-lg rounded-xl">
        <CardHeader title="Properties">
          <button onClick={toggleForm}><PiPlusSquareFill/></button>
        </CardHeader>

        {showAddPropertyForm && <AddPropertyForm />}
        {page === 'company'? <CompanyPropertyTable userId={userId} />: <PublicUserPropertyTable/>}
      </div>
    </div>
  );
}

export default PropertiesPage;


// {requests.map(request => (
//   <tr key={request.req_id} className={`bg-gray-50 cursor-pointer hover:bg-gray-100`} onClick={() => toggleSelectedRequest(request)}>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_id}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.unit_id}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.property_id}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_creator_username}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.type_name}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.status_name}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.details}</td>
//   </tr>
// ))}

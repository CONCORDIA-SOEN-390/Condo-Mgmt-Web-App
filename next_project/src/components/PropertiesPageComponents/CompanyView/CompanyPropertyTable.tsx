import { useRouter } from 'next/navigation'
import React, {useContext, useEffect, useState} from 'react';
import UnitsPage from "@/app/units/page";


export default function CompanyPropertyTable({userId}) {

  //const {userId ,profileUrl, email, phoneNumber, userName} = useContext(UserContext);
  const router = useRouter()


  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch(`/api/getProperties?userId=${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch properties');
          }
          return response.json();
        })
        .then(data => {
          setProperties(data);
        })
        .catch(error => {
          console.error('Error fetching properties:', error);
        });
  }, []);

  const handleRowClick = (propertyName: string) => {
    <UnitsPage propertyName={propertyName}/>
    router.push('/units')
  };

  return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="min-w-full bg-[#DAECFB] text-black">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">PropertyName</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Dimension (sqft)</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Number of Units</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Number of Floors</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Parking Count</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Locker Count</th>
        </tr>
        </thead>
        <tbody>
        {properties.map((property, id) => {
          return (
              <tr key={id} onClick={() => handleRowClick(property.propertyName)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{id + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.dimension}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.number_units}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.number_floors}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.parking_count}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.locker_count}</td>
              </tr>
          );
        })}
        </tbody>
      </table>
  );
}


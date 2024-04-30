import React, { useState, useEffect } from "react";
import ReserveFacilityPopup from "@/components/ReservationPageComponents/CompanyView/ReserveFacilityPopup";
import { PiPlusSquareFill } from "react-icons/pi";
import AddFacilityForm from "@/components/ReservationPageComponents/CompanyView/AddFacilityForm";
import MyReservationTable from "@/components/ReservationPageComponents/CompanyView/MyReservationTable";

interface Facility {
  property_id: number;
  facility_id: number;
  type: string;
  name: string;
  description: string;
}

const AvailableFacilityTable: React.FC<{ propertyId: number; userId: number }> = ({ propertyId, userId }) => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAddFacility, setShowAddFacility] = useState<boolean>(false);
  const [selectedReservationFacilityId, setSelectedReservationFacilityId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/getFacilityByProperty`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ propertyId })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch facilities');
        }
        const data = await response.json();
        setFacilities(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching facilities:', error);
        setLoading(false);
      }
    };

    fetchFacilities();
  }, [propertyId]);

  const handleReserveClick = (facilityItem: Facility) => {
    if (selectedFacility && selectedFacility.facility_id === facilityItem.facility_id) {
      setSelectedFacility(null);
      setShowPopup(false);
    } else {
      setSelectedFacility(facilityItem);
      setShowPopup(true);
    }
  };

  const handleReservationSubmit = (reservationDetails: any) => {
    console.log("Reservation details:", reservationDetails);
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const toggleAddFacility = () => {
    setShowAddFacility(prevState => !prevState);
  };

  const handleFacilityRowClick = (facilityId: number) => {
    setSelectedReservationFacilityId(prevState => (prevState === facilityId ? null : facilityId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="bg-gray-50 rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Available Facilities</h2>
            <button onClick={toggleAddFacility} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              <PiPlusSquareFill className="mr-2" />
              Add Facility
            </button>
          </div>
          {showAddFacility && <AddFacilityForm propertyId={propertyId} />}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#DAECFB] text-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {facilities.map((facilityItem, index) => (
                <React.Fragment key={index}>
                  <tr
                      onClick={() => handleFacilityRowClick(facilityItem.facility_id)}
                      className={`cursor-pointer ${selectedReservationFacilityId === facilityItem.facility_id ? "bg-gray-200" : ""} hover:bg-gray-200 cursor-pointer`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{facilityItem.facility_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{facilityItem.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{facilityItem.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                          onClick={() => handleReserveClick(facilityItem)}
                          className="bg-zinc-500 hover:bg-zinc-600 text-white py-2 px-4 rounded"
                      >
                        Reserve
                      </button>
                    </td>
                  </tr>
                  {selectedReservationFacilityId === facilityItem.facility_id && (
                      <tr>
                        <td colSpan={4} className="p-4">
                          <MyReservationTable facilityId={selectedReservationFacilityId} />
                        </td>
                      </tr>
                  )}
                </React.Fragment>
            ))}
            </tbody>
          </table>
          {showPopup && selectedFacility !== null && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <ReserveFacilityPopup
                    facility={selectedFacility!}
                    userId={userId}
                    propertyId={propertyId}
                    onReservationSubmit={handleReservationSubmit}
                    onCancel={handleCancel}
                />
              </div>
          )}
        </div>
      </div>
  );
};

export default AvailableFacilityTable;

import React, { useState, useEffect } from "react";
import ReserveFacilityPopup from "@/components/ReservationPageComponents/CompanyView/ReserveFacilityPopup";
interface Facility {
  facility_id: number;
  name: string;
  description: string;
}

const AvailableFacilityTable: React.FC<{ propertyId: number; userId: number }> = ({ propertyId, userId }) => {

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(false);

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
       // console.log('Fetched facilities:', data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching facilities:', error);
        setLoading(false);
      }
    };

    fetchFacilities();
  }, [propertyId]);

  const handleReserveClick = (facilityItem: Facility) => {
    setSelectedFacility(facilityItem);
    setShowPopup(true);
  };

  const handleReservationSubmit = (reservationDetails: any) => {
    console.log("Reservation details:", reservationDetails);
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

      <div className="overflow-y-auto h-64">
        <table className="min-w-full divide-y">
          <tbody>

          {facilities.map((facilityItem, index) => (
              <tr className="grid grid-cols-3 bg-stone-300 mb-4" key={index}>
                <td className="px-6 py-4 mt-2 text-sm text-black">
                  Facility: {facilityItem.name}
                </td>
                <td className="px-6 py-4 ml-4 mt-2 text-sm text-black">
                  Description: {facilityItem.description}
                </td>
                <td className="px-6 py-4 text-sm text-black text-right">
                  <button
                      onClick={() => handleReserveClick(facilityItem)}
                      className="bg-zinc-500 hover:bg-zinc-600 text-sm mr-7 text-white py-2 px-4 rounded mr-5"
                  >
                    Reserve
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <ReserveFacilityPopup
                    facility={selectedFacility}
                    userId={userId}
                    propertyId={propertyId}
                    onReservationSubmit={handleReservationSubmit}
                    onCancel={handleCancel}
                    />

              />
            </div>
        )}
      </div>
  );
};

export default AvailableFacilityTable;

// FacilityTableByProperty.tsx
import React, { useState, useEffect } from "react";

interface Reservation {
    reservation_id: number;
    facility_id: number;
    property_id: number;
    start_time: Date;
    end_time: Date;
    username: string;
}

interface Facility {
    facilityId: number;
    name: string;
    reservations: Reservation[];
}

const FacilityTableByProperty: React.FC<{ propertyId: number }> = ({ propertyId }) => {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const response = await fetch("/api/getFacilitiesWithReservationsByProperty", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        propertyId,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch facilities");
                }

                const data = await response.json();
                setFacilities(data);
                setLoading(false);
                console.log("Facilities with Reservations:", data);
            } catch (error) {
                console.error("Error fetching facilities:", error);
                setLoading(false);
            }
        };

        fetchFacilities();
    }, [propertyId]);

    const handleCancel = async (reservationId: number) => {
        // Implement cancel reservation logic here
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {facilities.map((facility, index) => (
                <div key={index}>
                    <h2>{facility.name}</h2>
                    <table className="min-w-full divide-y">
                        <thead>
                        <tr>
                            <th>Reservation ID</th>
                            <th>Username</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {facility.reservations.map((reservation, idx) => (
                            <tr key={idx}>
                                <td>{reservation.reservation_id}</td>
                                <td>{reservation.username}</td>
                                <td>{reservation.start_time}</td>
                                <td>{reservation.end_time}</td>
                                <td>
                                    <button
                                        className="bg-zinc-500 hover:bg-zinc-600 text-sm text-white py-2 px-5 rounded"
                                        onClick={() => handleCancel(reservation.reservation_id)}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default FacilityTableByProperty;

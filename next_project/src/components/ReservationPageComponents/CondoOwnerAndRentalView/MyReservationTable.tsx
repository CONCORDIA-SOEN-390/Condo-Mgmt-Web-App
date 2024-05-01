import React, { useState, useEffect } from "react";

interface Reservation {
    reservation_id: number;
    facility_id: number;
    facility_name: string;
    property_id: number;
    start_time: Date;
    end_time: Date;
    user_id: string;
    username: string;
}

const MyReservationTable: React.FC<{ propertyId: number, userId: number }> = ({ propertyId, userId }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch("/api/getReservationByUserId", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        propertyId: propertyId,
                        userId: userId,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch reservations");
                }

                const data = await response.json();
                setReservations(data);
                setLoading(false);
                console.log("Reservations:", data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
                setLoading(false);
            }
        };

        fetchReservations();

    }, [propertyId, userId]);

    const handleCancel = async (reservationId: number) => {
        try {
            const response = await fetch("/api/handleCancelReservation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reservationId,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to cancel reservation");
            }

            // Remove the canceled reservation from the list
            setReservations(reservations.filter(reservation => reservation.reservation_id !== reservationId));
        } catch (error) {
            console.error("Error canceling reservation:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Reservation ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Facility Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">End Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((reservation, index) => (
                <tr key={reservation.reservation_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.reservation_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.facility_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.user_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(reservation.start_time).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(reservation.end_time).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-blue-500 hover:bg-zinc-600 text-sm mr-7 text-white py-2 px-4 rounded mr-5" onClick={() => handleCancel(reservation.reservation_id)}>Cancel</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default MyReservationTable;
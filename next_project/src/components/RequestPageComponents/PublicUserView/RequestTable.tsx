import React, { useState, useEffect } from 'react';

interface Request{
    req_id: number;
    unit_id: number;
    property_id: number;
    req_creator: number;
    rqe_reviewer: number;
    type_id: number;
    status_id: number;
    details: string;
}


const RequestTable: React.FC<{ propertyId: number, userId: number }> = ({ propertyId, userId }) => {

    const [requests, setRequests] =  useState<Request[]>([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch("/api/getRequestsByUserId", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: userId,
                        propertyId: propertyId,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch reservations");
                }

                const data = await response.json();
                setRequests(data);
                setLoading(false);
                console.log("Reservations:", data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
                setLoading(false);
            }
        };

        fetchRequests();

    }, [propertyId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="overflow-x-auto">
            {requests.length > 0 && (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-400 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request Creator</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request Reviewer ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request Reviewer Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Details</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map(request => (
                        <tr key={request.req_id} className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.property_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.property_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.unit_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_creator_username}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_reviewer}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_reviewer_username}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.type_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.status_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.details}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {requests.length === 0 && (
                <div>No requests found</div>
            )}
        </div>
    );
};

export default RequestTable;
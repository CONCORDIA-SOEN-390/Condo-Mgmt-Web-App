import React, { useState, useEffect } from 'react';
import AddRequestForm from "@/components/RequestPageComponents/CompanyView/AddRequestForm";

interface Request {
    req_id: number;
    unit_id: number;
    property_id: number;
    req_creator: number;
    req_reviewer: number;
    type_id: number;
    status_id: number;
    details: string;
}

interface RequestType {
    type_id: number;
    type_name: string;
}

interface RequestStatus {
    status_id: number;
    status_name: string;
}

interface ReqReviewer {
    user_id: number;
    username: string;
}

const RequestTable: React.FC<{ propertyId: number, userId: number }> = ({ propertyId, userId }) => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
    const [requestStatuses, setRequestStatuses] = useState<RequestStatus[]>([]);
    const [reqReviewers, setReqReviewers] = useState<ReqReviewer[]>([]);
    const [showAddRequest, setShowAddRequest] = useState<boolean>(false);
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);



    const [loading, setLoading] = useState(true);

    const handleRowClick = (request: Request) => {
        setSelectedRequest(request);
    };

    const toggleAddRequest = () => {
        setShowAddRequest(!showAddRequest);
    };

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
                    throw new Error("Failed to fetch requests");
                }

                const data = await response.json();
                setRequests(data);
                setLoading(false);
                console.log("Requests:", data);
            } catch (error) {
                console.error("Error fetching requests:", error);
                setLoading(false);
            }
        };

        fetchRequests();
    }, [propertyId, userId]);

    useEffect(() => {
        const fetchRequestTypes = async () => {
            try {
                const response = await fetch("/api/getRequestTypes");

                if (!response.ok) {
                    throw new Error("Failed to fetch request types");
                }

                const data = await response.json();
                setRequestTypes(data);
                console.log("Request types:", data);
            } catch (error) {
                console.error("Error fetching request types:", error);
            }
        };

        fetchRequestTypes();
    }, []);

    useEffect(() => {
        const fetchRequestStatuses = async () => {
            try {
                const response = await fetch("/api/getRequestStatuses");

                if (!response.ok) {
                    throw new Error("Failed to fetch request statuses");
                }

                const data = await response.json();
                setRequestStatuses(data);
                console.log("Request statuses:", data);
            } catch (error) {
                console.error("Error fetching request statuses:", error);
            }
        };

        fetchRequestStatuses();
    }, []);



    const getReqReviewerNameById = (reqReviewerId: number) => {
        const reqReviewer = reqReviewers.find(reviewer => reviewer.user_id === reqReviewerId);
        return reqReviewer ? reqReviewer.username : '';
    };


    const getTypeNameById = (typeId: number) => {
        const requestType = requestTypes.find(type => type.type_id === typeId);
        return requestType ? requestType.type_name : '';
    };

    const getStatusNameById = (statusId: number) => {
        const requestStatus = requestStatuses.find(status => status.status_id === statusId);
        return requestStatus ? requestStatus.status_name : '';
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Request Information</h2>

            <button
                onClick={toggleAddRequest}
                className="button-spacing bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
            >
                Add Request
            </button>

            {showAddRequest && <AddRequestForm propertyId={propertyId} userId={userId} />}
            <div className="overflow-x-auto">
                {requests.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="min-w-full bg-[#DAECFB] text-black">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request Creator</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request Reviewer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Details</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {requests.map(request => (
                            <tr key={request.req_id} className="bg-gray-50" onClick={() => handleRowClick(request)}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.unit_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_creator}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_reviewer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getTypeNameById(request.type_id)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusNameById(request.status_id)}</td>
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
        </div>
    );
};

export default RequestTable;

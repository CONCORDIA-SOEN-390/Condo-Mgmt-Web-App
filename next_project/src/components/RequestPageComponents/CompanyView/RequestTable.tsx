import React, { useState, useEffect } from 'react';
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


const RequestTable = ({ userId, propertyId }) => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
    const [requestStatuses, setRequestStatuses] = useState<RequestStatus[]>([]);
    const [reqReviewers, setReqReviewers] = useState<ReqReviewer[]>([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('/api/getRequestsByProperty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ propertyId: propertyId })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log('Fetched data:', data);
            setRequests(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


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




    const handleRowClick = (request) => {
        setSelectedRequest(request);
    };

    const handleCloseForm = () => {
        setSelectedRequest(null);
    };

    return (
        <div className="overflow-x-auto">
            {requests.length > 0 && (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-400 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property ID</th>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.property_id}</td>

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
    );
};

export default RequestTable;
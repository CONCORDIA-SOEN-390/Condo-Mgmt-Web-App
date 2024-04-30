import React, { useState, useEffect, useCallback } from 'react';

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

interface RequestStatus {
    status_id: number;
    status_name: string;
}

interface RequestType {
    type_id: number;
    type_name: string;
}

interface RequestTableProps {
    userId: number;
}

const RequestTable: React.FC<RequestTableProps> = ({ userId }) => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [newStatus, setNewStatus] = useState<string>('');

    const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
    const [requestStatuses, setRequestStatuses] = useState<RequestStatus[]>([]);

    const fetchRequests = useCallback(async () => {
        try {
            const response = await fetch('/api/getAssignedRequests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reviewerId: userId })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch requests');
            }
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    }, [userId]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    useEffect(() => {
        const fetchRequestStatuses = async () => {
            try {
                const response = await fetch("/api/getRequestStatuses");

                if (!response.ok) {
                    throw new Error("Failed to fetch request statuses");
                }

                const data = await response.json();
                setRequestStatuses(data);
            } catch (error) {
                console.error("Error fetching request statuses:", error);
            }
        };

        fetchRequestStatuses();
    }, []);

    useEffect(() => {
        const fetchRequestTypes = async () => {
            try {
                const response = await fetch("/api/getRequestTypes");

                if (!response.ok) {
                    throw new Error("Failed to fetch request types");
                }

                const data = await response.json();
                setRequestTypes(data);
            } catch (error) {
                console.error("Error fetching request types:", error);
            }
        };

        fetchRequestTypes();
    }, []);

    const handleStatusChange = async () => {
        try {
            const response = await fetch('/api/handleUpdateRequestStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requestId: selectedRequest?.req_id,
                    statusId: newStatus
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            console.log('Status updated successfully');
            fetchRequests();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleRowClick = (request: Request) => {
        setSelectedRequest(request === selectedRequest ? null : request);
    };

    const getStatusNameById = (statusId: number) => {
        const requestStatus = requestStatuses.find(status => status.status_id === statusId);
        return requestStatus ? requestStatus.status_name : '';
    };

    const getTypeNameById = (typeId: number) => {
        const requestType = requestTypes.find(type => type.type_id === typeId);
        return requestType ? requestType.type_name : '';
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="min-w-full bg-[#DAECFB] text-black">
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
                    <React.Fragment key={request.req_id}>
                        <tr
                            className={`${
                                selectedRequest && selectedRequest.req_id === request.req_id
                                    ? 'bg-gray-100'
                                    : 'bg-white'
                            } hover:bg-gray-200 cursor-pointer`}
                            onClick={() => handleRowClick(request)}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.unit_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.property_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_creator}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_reviewer}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getTypeNameById(request.type_id)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusNameById(request.status_id)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.details}</td>
                        </tr>
                        {selectedRequest && selectedRequest.req_id === request.req_id && (
                            <tr>
                                <td colSpan={8} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="mt-4 text-lg text-black">
                                        <h2 className="mb-2">Update Status</h2>
                                        <select
                                            className="border border-gray-300 rounded px-3 py-2 mr-2"
                                            value={newStatus}
                                            onChange={(e) => setNewStatus(e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            {requestStatuses.map(status => (
                                                <option key={status.status_id} value={status.status_id}>{status.status_name}</option>
                                            ))}
                                        </select>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                            onClick={handleStatusChange}
                                        >
                                            Update Status
                                        </button>
                                    </div>

                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
            {requests.length === 0 && (
                <div>No requests found</div>
            )}
        </div>
    );
};

export default RequestTable;

import React, { useState, useEffect } from 'react';
import EditRequestForm from './EditRequestForm';

const RequestTable = ({userId}) => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('/api/getAssignedRequests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId})
            });
            if (!response.ok) {
                throw new Error('Failed to fetch requests');
            }
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
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
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request Creator ID</th>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.creator_username}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.reviewer_username}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.type_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.status_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.details}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {selectedRequest && (
                <EditRequestForm userId={userId} request={selectedRequest} onClose={handleCloseForm} />
            )}
            {requests.length === 0 && (
                <div>No requests found</div>
            )}
        </div>
    );
};

export default RequestTable;
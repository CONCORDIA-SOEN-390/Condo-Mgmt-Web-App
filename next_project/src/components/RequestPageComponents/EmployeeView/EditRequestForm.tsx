import React, { useState, useEffect } from 'react';

const EditRequestForm = ({ userId, onClose }) => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [statusOptions, setStatusOptions] = useState([]);

    useEffect(() => {
        fetchRequests();
        fetchStatusOptions();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('/api/getAssignedRequests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId })
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

    const fetchStatusOptions = async () => {
        try {
            const response = await fetch('/api/getRequestStatuses');
            if (!response.ok) {
                throw new Error('Failed to fetch status options');
            }
            const data = await response.json();
            setStatusOptions(data);
        } catch (error) {
            console.error('Error fetching status options:', error);
        }
    };

    const handleRowClick = (request) => {
        setSelectedRequest(request);
    };

    const handleStatusChange = async () => {
        try {
            const response = await fetch('/api/handleUpdateRequestStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requestId: selectedRequest.req_id,
                    statusId: newStatus
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            console.log('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
        }
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
            {requests.length === 0 && (
                <div>No requests found</div>
            )}

            {/* Update Status section */}
            {selectedRequest && (
                <div className="mt-4">
                    <h3 className="mb-2">Update Status</h3>
                    <select
                        className="border border-gray-300 rounded px-3 py-2 mr-2"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        {statusOptions.map(status => (
                            <option key={status.status_id} value={status.status_id}>{status.status_name}</option>
                        ))}
                    </select>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleStatusChange}
                    >
                        Update Status
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditRequestForm;

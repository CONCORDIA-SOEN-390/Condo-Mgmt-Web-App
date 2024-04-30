import React, { useState, useEffect } from 'react';

const EditRequestForm = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        fetchRequests();
    }, []);

    // same code as the RequestTable component
    const fetchRequests = async () => {
        try {
            const response = await fetch('/api/getRequestsByProperty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: 1, propertyId: 1 })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleSelectedRequest = (request: any) => {
        setSelectedRequest(selectedRequest === request ? null : request);
        setNewStatus('');
    };

    const handleStatusChange = async () => {
        try {
            const response = await fetch('/api/handleUpdateRequestStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reviewerId: 1,
                    requestId: selectedRequest.req_id,
                    statusId: newStatus,
                    propertyId: selectedRequest.property_id
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
        <div className="overflow-x-auto bg-blue-100 p-4">
            <h1 className="text-2xl mb-4">Update Request</h1>
            {requests.length > 0 && (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-400 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request Creator</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Details</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map(request => (
                        <tr key={request.req_id} className={`bg-gray-50 cursor-pointer hover:bg-gray-100`} onClick={() => toggleSelectedRequest(request)}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.unit_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.property_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_creator_username}</td>
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

            {selectedRequest && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Update Status</h3>
                    <select
                        className="border border-gray-300 rounded px-3 py-2"
                        value={newStatus}
                        onChange={e => setNewStatus(e.target.value)}
                    > {/*harcoded options for simplicity*/}
                        <option value="">Select Status</option>
                        <option value="1">In Review</option>
                        <option value="2">Denied</option>
                        <option value="3">Accepted</option>
                    </select>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                        onClick={handleStatusChange}
                    >
                        Update Status
                    </button>
                </div>
            )}
            <div className="h-8"></div>
        </div>
    );
};

export default EditRequestForm;

import React, { useState, useEffect } from 'react';

const EditRequestForm = ({ request, userId, propertyId, onClose }) => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [employees, setEmployees] = useState([]);
    const [newReviewer, setNewReviewer] = useState('');



    useEffect(() => {
        fetchRequests();
        fetchEmployees();
    }, [propertyId]);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('/api/getEmployeeByProperty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ propertyId: propertyId })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };


    // same code as the RequestTable component
    const fetchRequests = async () => {
        try {
            const response = await fetch('/api/getRequestsByProperty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId, propertyId: propertyId })
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



    const handleUpdateReviewer = async () => {
        try {
            const response = await fetch('/api/handleUpdateRequestReviewer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requestId: selectedRequest.req_id,
                    newReviewerId: newReviewer
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update reviewer');
            }
            console.log('Reviewer updated successfully');
            fetchRequests();
        } catch (error) {
            console.error('Error updating reviewer:', error);
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
                    //reviewerId: 1,
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

            <div className="overflow-x-auto bg-blue-100 p-4">
                <h1 className="text-2xl mb-4">Update Request</h1>
                <div>
                    <h1 className="text-xl font-bold mb-4 text-blue-500">Employees:</h1>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-400 text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Employee ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Job Description</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map(employee => (
                            <tr key={employee.employee_id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.employee_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.job_description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="my-8"></div>

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
                        <tr key={request.req_id} className={`bg-gray-50 cursor-pointer hover:bg-gray-100`} onClick={() => toggleSelectedRequest(request)}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.unit_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.property_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_creator_username}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.req_reviewer_username} - {request.req_reviewer_job_description}</td>
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

            {/* Update Reviewer section */}
            {selectedRequest && (
                <div className="mt-4"> {/* Added margin top */}
                    <h3 className="mb-2">Update Reviewer</h3>
                    <select
                        className="border border-gray-300 rounded px-3 py-2 mr-2"
                        value={newReviewer}
                        onChange={(e) => setNewReviewer(e.target.value)}
                    >
                        {/* Dropdown options */}
                        {employees.map(employee => (
                            <option key={employee.employee_id} value={employee.employee_id}>
                                {employee.employee_id} - {employee.username} - {employee.job_description}
                            </option>
                        ))}
                    </select>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleUpdateReviewer}
                    >
                        Update Reviewer
                    </button>
                </div>
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
                        <option value="1">In Review</option>
                        <option value="2">Denied</option>
                        <option value="3">Accepted</option>
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
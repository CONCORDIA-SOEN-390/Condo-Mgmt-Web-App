import React, { useState, useEffect } from "react";
import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";
import RegisterForm from "@/components/ProfilePageComponents/RegistrationForm";

interface User {
    user_id: number;
    username: string;
    email: string;
}

interface Notification {
    update_id: number;
    req_id: number;
    update_new_status: number;
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

interface DashboardProps {
    userId: number;
}

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
    const [requestStatuses, setRequestStatuses] = useState<RequestStatus[]>([]);
    const [reqCreators, setReqCreators] = useState<ReqReviewer[]>([]);
    const [reqReviewers, setReqReviewers] = useState<ReqReviewer[]>([]);

    const { data: session } = useSession();
    // @ts-ignore comment
    // @ts-ignore comment
    const userName = session?.user?.username;
    // @ts-ignore comment
    const email = session?.user?.email;
    // @ts-ignore comment
    const phoneNumber = session?.user?.phone_number;


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
        const fetchNotifications = async () => {
            try {
                const response = await fetch("/api/getNotificationsByUser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch notifications");
                }

                const notificationData = await response.json();
                setNotifications(notificationData);

                // @ts-ignore
                const creatorIds = Array.from(new Set(notificationData.map(notification => notification.req_creator)));
                // @ts-ignore
                const reviewerIds = Array.from(new Set(notificationData.map(notification => notification.req_reviewer)));

                // @ts-ignore
                const creators = await fetchUsernames(creatorIds);
                // @ts-ignore
                const reviewers = await fetchUsernames(reviewerIds);

                setReqCreators(creators);
                setReqReviewers(reviewers);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [userId]);

    const getTypeNameById = (typeId: number) => {
        const requestType = requestTypes.find(type => type.type_id === typeId);
        return requestType ? requestType.type_name : '';
    };

    const getStatusNameById = (statusId: number) => {
        const requestStatus = requestStatuses.find(status => status.status_id === statusId);
        return requestStatus ? requestStatus.status_name : '';
    };

    async function fetchUsernames(userIds: number[]) {
        try {
            const response = await fetch("/api/getUsers", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();
            return data.filter((user: User) => userIds.includes(user.user_id));
        } catch (error) {
            console.error("Error fetching usernames:", error);
            return [];
        }
    }

    const getUsernameById = (userId: number, users: ReqReviewer[]) => {
        const user = users.find(user => user.user_id === userId);
        return user ? user.username : '';
    };


    return (

        <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-4 mb-4">
                <h1 className="text-xl font-bold mb-2">Name: {userName} </h1>
                <h1 className="text-xl font-bold mb-2">Email: {email} </h1>
                <h1 className="text-xl font-bold mb-2">Phone Number: {phoneNumber} </h1>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
                <RegisterForm userId={userId}></RegisterForm>
            </div>


            <h2 className="text-xl font-bold mb-2">Notifications:</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#DAECFB]">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Update ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Request ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">New Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Unit ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Property ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Request Creator</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Request Reviewer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Request Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Request Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Details</th>
                        <th className="px-6 py-3"></th> {/* Empty cell for delete button */}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {notifications.map((notification) => (
                        <tr key={notification.update_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.update_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.req_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusNameById(notification.update_new_status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.unit_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.property_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getUsernameById(notification.req_creator, reqCreators)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getUsernameById(notification.req_reviewer, reqReviewers)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getTypeNameById(notification.type_id)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusNameById(notification.status_id)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.details}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Dashboard;

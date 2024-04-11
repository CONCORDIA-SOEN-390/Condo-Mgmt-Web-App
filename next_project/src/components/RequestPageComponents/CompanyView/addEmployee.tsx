import { useState, useEffect } from 'react';


/// in progress
const AddEmployee = ({ propertyId }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        phoneNumber: '',
        employeeType: '',
        jobDescription: '',
        profileUrl: '',
        accountType: '', // New field for account type
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/getJobs');
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError('Failed to fetch jobs');
            }
        };

        fetchJobs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e, propertyId) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('/api/handleCreateEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, propertyId }),
            });

            if (!response.ok) {
                throw new Error('Failed to add employee');
            }

            setSuccess(true);
        } catch (error) {
            setError('Failed to add employee');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="bg-sky-100 p-5 rounded-lg">
            <h6 className="text-blue-800 font-semibold text-lg mb-6">Add Employee</h6>
            <form onSubmit={(e) => handleSubmit(e, propertyId)} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <select
                    name="employeeType"
                    value={formData.employeeType}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Select Employee Type</option>
                    <option value="operations">Operations</option>
                    <option value="management">Management</option>
                    <option value="finance">Finance</option>
                </select>
                <input
                    type="text"
                    name="profileUrl"
                    value={formData.profileUrl}
                    onChange={handleChange}
                    placeholder="Profile URL"
                    className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {loading ? 'Adding...' : 'Add Employee'}
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Employee added successfully!</p>}
        </div>
    );
};

export default AddEmployee;
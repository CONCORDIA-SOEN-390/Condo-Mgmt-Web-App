import React, { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface Unit {
    unitNumber: number;
    parkingLocker: number;
    size: number;
    occupied: string;
    owner: string;
    email: string;
    fee: number;
}

interface Props {
    unit: Unit;
    onClose: () => void;
}

const UnitDetails: React.FC<Props> = ({ unit, onClose }) => {
    const [key, setKey] = useState('sdfhjd9o3h1-wq837');
    const [showKey, setShowKey] = useState(false);

    const handleToggleKeyVisibility = () => {
        setShowKey(!showKey);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-white w-5/6 text-black rounded-lg shadow-md" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between bg-[#CDCDCD] rounded-t-lg">
                    <h2 className="mt-2 ml-2 text-2xl font-bold mb-4">Unit {unit.unitNumber} Details</h2>
                    <span className="text-4xl mr-2 cursor-pointer" onClick={onClose}>&times;</span>
                </div>
                <div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#DAECFB] text-black">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Parking Spot</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Locker Number</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit Size (sqft)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Occupied</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Condo Fee ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{unit.unitNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.parkingLocker}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.parkingLocker}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.size}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.occupied}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.owner}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.fee}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='flex justify-center p-2'>
                        <p className='mt-2'>Registration Key</p>
                        <div className="mt-1 ml-2 text-black relative rounded-md shadow-sm">
                            <input
                                type={showKey ? 'text' : 'password'}
                                readOnly
                                value={key}
                                className="appearance-none w-full px-3 py-2 bg-[#DAECFB] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                                onClick={handleToggleKeyVisibility}>
                                {showKey ? (
                                    <FaEye></FaEye>
                                ) : (
                                    <FaEyeSlash></FaEyeSlash>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitDetails;

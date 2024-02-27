import React from 'react'
import { UserBio } from '@/components/ProfilePageComponents//ProfileInfo'
import { MdDashboard } from "react-icons/md";
import { FaBuilding } from "react-icons/fa6";
import { FaChartColumn } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdEditSquare } from "react-icons/md";
import { MdCancel } from "react-icons/md";

function page() {
    return (
        <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
            <div className='absolute left-0 bg-sky-300 min-h-screen w-48 rounded-r-lg'>
                <div className="flex flex-wrap justify-center">
                    <div className=" mt-5 w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">J</span>
                    </div>
                    <div className="text-center mt-2 text-white text-xl font-semibold">
                        John Smith
                        <MdDashboard className='ml-10 mt-20 text-white text-3xl' />
                        Dashboard
                        <FaChartColumn className='ml-10 mt-2 text-white text-3xl' />
                        Finances
                        <FaBuilding className='ml-10 mt-2 text-blue-600 text-3xl' />
                        <span className='text-blue-600'>Properties</span>
                        <IoSettingsSharp className='ml-10 mt-16 text-white text-3xl' />
                        Settings
                        <IoIosHelpCircle className='ml-10 mt-2 text-white text-3xl' />
                        Contact Us
                        <FiLogOut className='ml-10 mt-2 text-white text-3xl' />
                        Log Out
                    </div>
                </div>
            </div>
            <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl ">
                <div className='grid grid-cols-2 bg-sky-300 rounded-t-lg'>
                    <div className='p-2 font-semibold text-white text-2xl'>Properties</div>
                    <div className='p-2 flex justify-end items-center text-white text-3xl gap-5'>
                        <MdEditSquare className=''/>
                        <MdCancel className=''/>
                    </div>
                </div>
                <div className='grid grid-cols-2 p-5 text-black text-xl'>
                    <div>Condo 1</div>
                    <div className='flex justify-end items-center'>Some info on Condo 1</div>
                </div>
            </div>
        </div>
    );
}

export default page
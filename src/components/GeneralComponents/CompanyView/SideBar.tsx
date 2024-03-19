import { MdDashboard } from "react-icons/md";
import { FaBuilding, FaFile, FaPerson } from "react-icons/fa6";
import { FaChartColumn } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";

export default function SideBar({page}: {page: string}){
    return (
    <div className="absolute left-0 bg-sky-300 min-h-screen w-48 rounded-r-lg">
        <div className="flex flex-wrap justify-center">
            <div className=" mt-5 w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-4xl font-bold">J</span>
            </div>
            <div className="text-center mt-2 text-white text-xl font-semibold">
                    John Smith
                <Link href={"profile"} className={page==='profile'? 'text-blue-600': ' text-white'}>
                    <MdDashboard className="ml-10 mt-20 text-3xl"  />
                    Dashboard
                </Link>
                <Link href={"finances"} className={page==='finances'? 'text-blue-600': ' text-white'}>
                    <FaChartColumn className="ml-10 mt-2 text-3xl" />
                    Finances
                </Link>
                <Link href={"properties"} className={page==='properties'? 'text-blue-600': ' text-white'}>
                    <FaBuilding className="ml-10 mt-2 text-3xl" />
                    Properties
                </Link>
                <Link href={"documents"} className={page==='documents'? 'text-blue-600': ' text-white'}>
                    <FaFile className="ml-10 mt-2 text-3xl" />
                    Documents
                </Link>
                <Link href={"staff"} className={page==='staff'? 'text-blue-600': ' text-white'}>
                    <FaPerson className="ml-10 mt-2 text-3xl" />
                    Staff
                </Link>
                <IoSettingsSharp className="ml-10 mt-16 text-white text-3xl" />
                    Settings
                <IoIosHelpCircle className="ml-10 mt-2 text-white text-3xl" />
                    Contact Us
                <FiLogOut className="ml-10 mt-2 text-white text-3xl" />
                    Log Out
            </div>
        </div>
    </div>
    );
}
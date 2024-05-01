import { MdDashboard } from "react-icons/md";
import { FaHouse, FaFile, FaPerson } from "react-icons/fa6";
import { FaChartColumn } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";


export default function SideBar({ page }: { page: string }) {
    return (
        <div className="absolute left-0 bg-[#CDCDCD] h-full w-48 rounded-r-lg">
            <div className="flex justify-center">
                <div className="mt-10 xl:mt-10 text-black text-xl font-semibold">
                    <Link href={"profile"} className={page === 'profile' ? 'text-[#DAECFB]' : ' text-black'}>
                        <div className="inline-flex items-center pl-3 mb-3">
                            <MdDashboard className="text-xl" />
                            <span className="ml-2">Profile</span>
                        </div>
                    </Link>
                    <Link href={"finances"} className={page === 'finances' ? 'text-[#DAECFB]' : ' text-black'}>
                        <div className="inline-flex items-center pl-3 mb-3">
                            <FaChartColumn className="text-xl" />
                            <span className="ml-2">Finances</span>
                        </div>
                    </Link>
                    <Link href={"properties"} className={page === 'properties' ? 'text-[#DAECFB]' : ' text-black'}>
                        <div className="inline-flex items-center pl-3 mb-3">
                            <FaHouse className="text-xl" />                        
                            <span className="ml-2">Properties</span>
                        </div>
                    </Link>
                    <Link href={"requests"} className={page === 'requests' ? 'text-[#DAECFB]' : ' text-black'}>
                        <div className="inline-flex items-center pl-3 mb-3">
                            <FaFile className="text-xl" />
                            <span className="ml-2">Requests</span>
                        </div>
                    </Link>
                    <Link href={"reservations"} className={page === 'reservations' ? 'text-[#DAECFB]' : ' text-black'}>
                        <div className="inline-flex items-center pl-3 mb-3">
                            <FaPerson className="text-xl" />
                            <span className="ml-2">Reservations</span>
                        </div>
                    </Link>
                    <Link href={"documents"} className={page === 'documents' ? 'text-[#DAECFB]' : ' text-black'}>
                        <div className="inline-flex items-center pl-3 mb-20"> 
                            <FaFile className="text-xl" />
                            <span className="ml-2">Documents</span>
                        </div>
                    </Link>
                    <Link href={"/"}>
                        <div className="inline-flex items-center pl-3 mb-3">
                            <FiLogOut className="text-xl" />
                            <span className="ml-2">Log Out</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
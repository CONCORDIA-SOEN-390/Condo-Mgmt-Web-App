import { MdDashboard } from "react-icons/md";
import { FaCalendar, FaFile, FaHouse } from "react-icons/fa6";
import { FaChartColumn } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";

export default function SideBar({ page }: { page: string }) {
    return (
        <div className="absolute left-0 bg-[#CDCDCD] h-full w-48 rounded-r-lg">
            <div className="flex flex-wrap justify-center">
                <div className="mt-10 xl:mt-20 text-black text-xl font-semibold">
                    <Link href={"profile"} className={page === 'profile' ? 'text-[#DAECFB]' : ' text-black'}>
                        <MdDashboard className="mt-2 text-xl" />
                        Dashboard
                    </Link>
                    <Link href={"finances"} className={page === 'finances' ? 'text-[#DAECFB]' : ' text-black'}>
                        <FaChartColumn className="mt-1 xl:mt-2 text-xl" />
                        Finances
                    </Link>
                    <Link href={"units"} className={page === 'units' ? 'text-[#DAECFB]' : ' text-black'}>
                        <FaHouse className="mt-1 xl:mt-2 text-xl" />
                        Condo Units
                    </Link>
                    <Link href={"documents"} className={page === 'documents' ? 'text-[#DAECFB]' : ' text-black'}>
                        <FaFile className="mt-1 xl:mt-2 text-xl" />
                        Documents
                    </Link>
                    <Link href={"reservations"} className={page === 'reservations' ? 'text-[#DAECFB]' : ' text-black'}>
                        <FaCalendar className="mt-2 text-xl" />
                        Reservations
                    </Link>
                    <Link href={"/"} className={page === 'reservations' ? 'text-[#DAECFB]' : ' text-black'}>
                        <FiLogOut className="mt-10 xl:mt-20 text-black text-xl" />
                        Log Out
                    </Link>
                </div>
            </div>
        </div>
    );
}